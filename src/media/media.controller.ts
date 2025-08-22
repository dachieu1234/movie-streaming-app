import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
  Get,
  Param,
  Res,
  Req,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { fileFilter } from "../common/filters/file.filter";
import { MinioService } from "../minio/minio.service";
import { Express, Response } from "express";
import {
  ApiTags,
  ApiConsumes,
  ApiBody,
  ApiResponse,
  ApiParam,
  ApiHeader,
} from "@nestjs/swagger";

@ApiTags("Media")
@Controller("media")
export class MediaController {
    constructor(private readonly minio: MinioService) {}

    @Post('upload')
    @UseInterceptors(
        FileInterceptor("file", {
        fileFilter,
            limits: { fileSize: 200 * 1024 * 1024 }, // 200MB
        }),
    )
    @ApiConsumes("multipart/form-data")
    @ApiBody({
        schema: {
        type: "object",
        properties: {
            file: { type: "string", format: "binary" },
            bucket: { type: "string", example: "assets" },
        },
        required: ["file"],
        },
    })
    @ApiResponse({
        status: 201,
        description: "File uploaded successfully",
        schema: {
            example: { fileId: "1692712099000-movie.mp4" },
        },
    })
    async upload(
        @UploadedFile() file: Express.Multer.File,
        @Body("bucket") bucket = "assets",
    ) {
        const name = `${Date.now()}-${file?.originalname || "file.bin"}`;
        const fileId = await this.minio.upload(
            bucket,
            name,
            file.buffer,
            file.mimetype || "application/octet-stream",
        );
        return { fileId, bucket };
    }

    @Get(":bucket/:fileId")
    @ApiParam({ name: "assets", type: String })
    @ApiParam({ name: "fileId", type: String })
    @ApiHeader({
        name: "Range",
        description: "Byte range for streaming video/audio. Example: bytes=0-1023",
        required: false,
        example: "bytes=0-1023",
    })
    @Get(":bucket/:fileId")
    async getVideo(
        @Param("bucket") bucket: string,
        @Param("fileId") fileId: string,
        @Res() res: Response,
        @Req() req: Request,
    ) {
        const fileStat = await this.minio.client.statObject(bucket, fileId);
        const fileSize = fileStat.size;
        const range = req.headers['range'];

        if (!range) {
            // Nếu không có Range -> trả full
            res.setHeader("Content-Length", fileSize);
            res.setHeader("Content-Type", fileStat.metaData["content-type"] || "application/octet-stream");
            const stream = await this.minio.getFileStream(bucket, fileId);
            return stream.pipe(res);
        }

        // Nếu có Range -> xử lý partial content
        const CHUNK_SIZE = 10 ** 6; // 1MB
        const start = Number(range.replace(/\D/g, ""));
        const end = Math.min(start + CHUNK_SIZE, fileSize - 1);

        res.status(206); // Partial Content
        res.setHeader("Content-Range", `bytes ${start}-${end}/${fileSize}`);
        res.setHeader("Accept-Ranges", "bytes");
        res.setHeader("Content-Length", end - start + 1);
        res.setHeader("Content-Type", fileStat.metaData["content-type"] || "video/mp4");

        const stream = await this.minio.client.getPartialObject(bucket, fileId, start, end - start + 1);
        stream.pipe(res);
    }
}
