import { S3Client } from "@aws-sdk/client-s3";
import config from "../helpers/env";

const s3Client = new S3Client({
  region: config.AWS_REGION,
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.SECRET_ACCESS_KEY,
  },
});

export { s3Client };

