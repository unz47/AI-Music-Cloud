import { S3Client } from "@aws-sdk/client-s3";

const region = process.env.APP_AWS_REGION ?? process.env.AWS_REGION ?? "ap-northeast-1";

const credentials = process.env.APP_AWS_ACCESS_KEY_ID
  ? {
      accessKeyId: process.env.APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY!,
    }
  : undefined;

export const BUCKET = process.env.S3_BUCKET!;
export const s3 = new S3Client({ region, credentials });
