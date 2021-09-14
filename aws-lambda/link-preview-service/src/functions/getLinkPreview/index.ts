import { handlerPath } from "@libs/handlerResolver";

export default {
  handler: `${handlerPath(__dirname)}/getLinkPreview.main`,
  events: [
    {
      http: {
        method: "get",
        path: "link-preview",
        request: {
          parameters: {
            querystrings: {
              url: true,
            },
          },
        },
      },
    },
  ],
};
