import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand } from "@aws-sdk/lib-dynamodb";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { randomUUID } from "crypto";
import {
  badRequestResponse,
  errorResponse,
  successResponse,
} from "../util/responseUtil";

type CreateProductParams = {
  productName: string;
  productPrice: number;
};

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

exports.handler = async (
  event: APIGatewayProxyEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    const paramBody = event.body
      ? (JSON.parse(event.body) as CreateProductParams)
      : undefined;

    if (!paramBody?.productName || !paramBody?.productPrice) {
      return badRequestResponse();
    }

    const productItem = {
      productId: randomUUID(),
      productName: paramBody.productName,
      productPrice: paramBody.productPrice,
    };

    await docClient.send(
      new PutCommand({
        TableName: process.env.TABLE_NAME,
        Item: productItem,
      }),
    );

    return successResponse<{ productId: string }>({
      message: `Product created successfully`,
      data: { productId: productItem.productId },
    });
  } catch (error) {
    console.error({ error }, "createProduct");
    return errorResponse();
  }
};
