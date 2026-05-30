import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DynamoDBDocumentClient,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  badRequestResponse,
  errorResponse,
  successResponse,
} from "../util/responseUtil";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const productId = event.pathParameters?.productId;

    if (!productId) {
      return badRequestResponse();
    }

    const dbResult = await docClient.send(
      new QueryCommand({
        TableName: process.env.TABLE_NAME,
        KeyConditionExpression: "productId = :productId",
        ExpressionAttributeValues: {
          ":productId": productId,
        },
      }),
    );

    return successResponse({
      message: "Product fetched successfully",
      data: { product: dbResult.Items?.[0] },
    });
  } catch (error) {
    console.error({ error }, "getProduct");
    return errorResponse();
  }
};
