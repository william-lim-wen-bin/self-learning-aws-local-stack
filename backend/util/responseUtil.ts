import { APIGatewayProxyResult } from "aws-lambda";
import { SuccessResponseBody } from "../type/response";

export const successResponse = <T>(
  resBody: SuccessResponseBody<T>,
): APIGatewayProxyResult => {
  return {
    statusCode: 200,
    body: JSON.stringify(resBody),
  };
};

export const errorResponse = (): APIGatewayProxyResult => {
  return {
    statusCode: 500,
    body: JSON.stringify({ message: "Failed to create product" }),
  };
};

export const badRequestResponse = (): APIGatewayProxyResult => {
  return {
    statusCode: 400,
    body: JSON.stringify({ message: "Invalid request body" }),
  };
};
