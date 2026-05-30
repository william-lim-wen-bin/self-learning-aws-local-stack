import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DeleteCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import {
  badRequestResponse,
  errorResponse,
  successResponse,
} from "../util/responseUtil";

type DeleteProductParams = { productId: string };

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const paramBody = event.body
      ? (JSON.parse(event.body) as DeleteProductParams)
      : undefined;

    if (!paramBody?.productId) {
      return badRequestResponse();
    }

    await docClient.send(
      new DeleteCommand({
        TableName: process.env.TABLE_NAME,
        Key: { productId: paramBody.productId },
      }),
    );

    return successResponse<{ productId: string }>({
      message: `Product deleted successfully`,
      data: { productId: paramBody.productId },
    });
  } catch (error) {
    console.error({ error }, "deleteProduct");
    return errorResponse();
  }
};
