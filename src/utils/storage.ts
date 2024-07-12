import { PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
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
    return { success: true, data: { key: params.Key }};
  } catch (error) {
    console.error('Error uploading file:', (error as Error).message);
    return { success: false, message: "Failed to upload",error: (error as Error).message };
  }
};

const getFileFromS3 = async (awskey: string): Promise<Blob | null> => {
  const params = {
    Bucket: config.AWS_BUCKET,
    Key: awskey,
  };

  try {
    const command = new GetObjectCommand(params);
    const response = await s3Client.send(command);
    
    if (response.Body) {
      return new Blob([await response.Body.transformToByteArray()]);
    }
    return null;
  } catch (error) {
    console.error('Error downloading file from S3:', (error as Error).message);
    return null;
  }
}; //return file blob

// const getFileFromS3 = async (awskey: string) => {
//   const params = {
//     Bucket: config.AWS_BUCKET,
//     Key: awskey,
//   };

//   try{
//     const command = new GetObjectCommand(params)
//     const url = await getSignedUrl(s3Client, command, {expiresIn: 60}) // 1 minute
//     return {success: true, url: url}
//   }
//   catch (error) {
//     console.error('Error downloading file from S3:', (error as Error).message);
//     return {success: false, message: "Failed to get file", error: (error as Error).message};
//   }
// } //return tmporary persigned url

export { uploadToS3, getFileFromS3 };
