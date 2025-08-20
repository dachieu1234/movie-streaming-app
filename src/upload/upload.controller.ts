import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Body,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { MinioService } from "../minio/minio.service";
import { Express } from "express";

@Controller("upload")
export class UploadController {
  constructor(private readonly minio: MinioService) {}

  @Post()
  @UseInterceptors(FileInterceptor("file"))
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body("bucket") bucket = "assets",
  ) {
    const name = `${Date.now()}-${file?.originalname || "file.bin"}`;
    const url = await this.minio.upload(
      bucket,
      name,
      file.buffer,
      file.mimetype || "application/octet-stream",
    );
    return { url };
  }
}
