import { APIGatewayProxyResult } from "aws-lambda";
import { SuccessResponseBody } from "../type/response";

export const successResponse = <T>(
  resBody: SuccessResponseBody<T>,
): APIGatewayProxyResult => {
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      // "Access-Control-Allow-Headers": "Content-Type,Authorization",
      // "Access-Control-Allow-Methods": "OPTIONS,POST,GET,DELETE",
    },
    body: JSON.stringify(resBody),
  };
};

export const errorResponse = (): APIGatewayProxyResult => {
  return {
    statusCode: 500,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ message: "Failed to create product" }),
  };
};

export const badRequestResponse = (): APIGatewayProxyResult => {
  return {
    statusCode: 400,
    headers: { "Access-Control-Allow-Origin": "*" },
    body: JSON.stringify({ message: "Invalid request body" }),
  };
};
