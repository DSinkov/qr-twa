import type { AWS } from "@serverless/typescript";

import getLinkPreview from "@functions/getLinkPreview";

const serverlessConfiguration: AWS = {
  service: "link-preview-service",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "./webpack.config.js",
      includeModules: true,
    },
  },
  plugins: ["serverless-webpack"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    region: "eu-west-1",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
      CORS_ORIGIN: "${env:CORS_ORIGIN}",
    },
    lambdaHashingVersion: "20201221",
  },
  // import the function via paths
  functions: { getLinkPreview },
};

module.exports = serverlessConfiguration;
