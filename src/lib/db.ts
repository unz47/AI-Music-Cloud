import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const region = process.env.APP_AWS_REGION ?? process.env.AWS_REGION ?? "ap-northeast-1";

const credentials = process.env.APP_AWS_ACCESS_KEY_ID
  ? {
      accessKeyId: process.env.APP_AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.APP_AWS_SECRET_ACCESS_KEY!,
    }
  : undefined;

const client = new DynamoDBClient({ region, credentials });
export const db = DynamoDBDocumentClient.from(client);

export const TABLE = {
  tracks: "ai-music-tracks",
  likes: "ai-music-likes",
  follows: "ai-music-follows",
} as const;
