import { BadRequestException } from "@nestjs/common";
import { MimeTypes } from "../constants/mime-types";

const allowedTypes = Object.values(MimeTypes);

export function fileFilter(req, file, callback) {
  if (allowedTypes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(
      new BadRequestException(
        `❌ File type not allowed: ${file.mimetype}`,
      ),
      false,
    );
  }
}
