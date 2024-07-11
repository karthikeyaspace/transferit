import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from '../services/awss3';
import { randcode } from "../helpers/filehandle";
import config from "../helpers/env";

const uploadToS3 = async (file: File) => {
  const params = {
    Bucket: config.AWS_BUCKET,
    Key: randcode(12),
    Body: file,
  };

  try {
    await s3Client.send(new PutObjectCommand(params));
    return { message: "success", data: { key: params.Key }};
  } catch (error) {
    console.error('Error uploading file:', (error as Error).message);
    return { message: "error", error: (error as Error).message };
  }
};

export { uploadToS3 };
