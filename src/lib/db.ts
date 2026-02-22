import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({ region: process.env.AWS_REGION ?? "ap-northeast-1" });
export const db = DynamoDBDocumentClient.from(client);

export const TABLE = {
  tracks: "ai-music-tracks",
  likes: "ai-music-likes",
  follows: "ai-music-follows",
} as const;
