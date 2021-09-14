import "source-map-support/register";

import type { ValidatedEventAPIGatewayProxyEvent } from "@libs/apiGateway";
import { formatJSONResponse } from "@libs/apiGateway";
import { middyfy } from "@libs/lambda";
import { getLinkPreview as generateLinkPreview } from "link-preview-js";

const getLinkPreview: ValidatedEventAPIGatewayProxyEvent<null> = async (
  event
) => {
  try {
    const data = await generateLinkPreview(event.queryStringParameters.url);
    return formatJSONResponse(data);
  } catch (e) {
    return formatJSONResponse({ url: event.queryStringParameters.url }, 500);
  }
};

export const main = middyfy(getLinkPreview);
