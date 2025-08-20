import { Module } from "@nestjs/common";
import { UploadController } from "./upload.controller";
import { MinioService } from "../minio/minio.service";

@Module({ controllers: [UploadController], providers: [MinioService] })
export class UploadModule {}
