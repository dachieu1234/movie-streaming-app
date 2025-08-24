import { Injectable, Logger } from "@nestjs/common";
import { Client } from "minio";

@Injectable()
export class MinioService {
    private readonly logger = new Logger(MinioService.name);
    public readonly client: Client;

    constructor() {
        this.client = new Client({
            endPoint: process.env.MINIO_ENDPOINT || "localhost",
            port: parseInt(process.env.MINIO_PORT || "9000", 10),
            useSSL: false, // nếu bạn setup HTTPS cho MinIO thì đổi thành true
            accessKey: process.env.MINIO_ACCESS_KEY || "admin",
            secretKey: process.env.MINIO_SECRET_KEY || "password",
        });
    }

    private async ensureBucket(bucket: string) {
        const exists = await this.client.bucketExists(bucket);
        if (!exists) {
            this.logger.log(`Bucket "${bucket}" not found. Creating...`);
            await this.client.makeBucket(bucket, "us-east-1");
        }
    }

    async upload(
        bucket: string,
        objectName: string,
        data: Buffer,
        contentType: string,
    ): Promise<string> {
        await this.ensureBucket(bucket);
        await this.client.putObject(bucket, objectName, data, data.length, {
            "Content-Type": contentType,
        });
        return objectName;
    }

    async getFileUrl(
        bucket: string,
        objectName: string,
        expiry = 60 * 60,
    ): Promise<string> {
        return await this.client.presignedGetObject(bucket, objectName, expiry);
    }

    async getFileStream(bucket: string, objectName: string) {
        await this.ensureBucket(bucket);
        return await this.client.getObject(bucket, objectName);
    }

    async delete(bucket: string, objectName: string): Promise<void> {
        await this.client.removeObject(bucket, objectName);
        this.logger.log(`Deleted file ${bucket}/${objectName}`);
    }
}
