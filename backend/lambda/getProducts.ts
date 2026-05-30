import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { errorResponse, successResponse } from "../util/responseUtil";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (
  _event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const dbResult = await docClient.send(
      new ScanCommand({
        TableName: process.env.TABLE_NAME,
        Limit: 10,
      }),
    );

    return successResponse({
      message: "Products fetched successfully",
      data: { products: dbResult.Items },
    });
  } catch (error) {
    console.error({ error }, "getProducts");
    return errorResponse();
  }
};
