import { CfnOutput, RemovalPolicy, Stack, StackProps } from "aws-cdk-lib";
import {
  Cors,
  EndpointType,
  LambdaIntegration,
  RestApi,
} from "aws-cdk-lib/aws-apigateway";
import { AttributeType, BillingMode, Table } from "aws-cdk-lib/aws-dynamodb";
import { NodejsFunction } from "aws-cdk-lib/aws-lambda-nodejs";
import { Construct } from "constructs";

export class BackendStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const productTable = new Table(this, "ProductTable", {
      partitionKey: {
        name: "productId",
        type: AttributeType.STRING,
      },
      billingMode: BillingMode.PAY_PER_REQUEST,
      removalPolicy: RemovalPolicy.DESTROY,
    });

    // Lambda functions
    const lambdaEnv = { TABLE_NAME: productTable.tableName };

    const createProductLambda = new NodejsFunction(
      this,
      "CreateProductLambda",
      {
        entry: "lambda/createProduct.ts",
        handler: "handler",
        environment: lambdaEnv,
      },
    );
    const getProductsLambda = new NodejsFunction(this, "GetProductsLambda", {
      entry: "lambda/getProducts.ts",
      handler: "handler",
      environment: lambdaEnv,
    });
    const getProductLambda = new NodejsFunction(this, "GetProductLambda", {
      entry: "lambda/getProduct.ts",
      handler: "handler",
      environment: lambdaEnv,
    });
    const deleteProductLambda = new NodejsFunction(
      this,
      "DeleteProductLambda",
      {
        entry: "lambda/deleteProduct.ts",
        handler: "handler",
        environment: lambdaEnv,
      },
    );

    // Permissions
    productTable.grantReadData(getProductsLambda);
    productTable.grantReadData(getProductLambda);
    productTable.grantWriteData(createProductLambda);
    productTable.grantWriteData(deleteProductLambda);

    // API Gateway
    const api = new RestApi(this, "ProductApi", {
      restApiName: "Product Service",
      endpointConfiguration: {
        types: [EndpointType.REGIONAL],
      },
      defaultCorsPreflightOptions: {
        allowOrigins: Cors.ALL_ORIGINS,
        allowMethods: Cors.ALL_METHODS,
        // allowHeaders: ['Content-Type', 'Authorization'],
      },
    });

    const productRes = api.root.addResource("product");
    productRes.addMethod("DELETE", new LambdaIntegration(deleteProductLambda));

    const productIdRes = productRes.addResource("{productId}");
    productIdRes.addMethod("GET", new LambdaIntegration(getProductLambda));

    const productsRes = api.root.addResource("products");
    productsRes.addMethod("GET", new LambdaIntegration(getProductsLambda));

    const createProductRes = api.root.addResource("create-product");
    createProductRes.addMethod(
      "POST",
      new LambdaIntegration(createProductLambda),
    );

    console.log({ url: api.url });

    // Outputs
    new CfnOutput(this, "ApiEndpoint", { value: api.url });
  }
}
