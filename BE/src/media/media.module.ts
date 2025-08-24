import { Module } from "@nestjs/common";
import { MediaController } from "./media.controller";
import { MinioService } from "../minio/minio.service";

@Module({ controllers: [MediaController], providers: [MinioService] })
export class UploadModule {}
