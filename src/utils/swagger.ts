import expressOasGenerator from "express-oas-generator";
import mongoose from "mongoose";
const _ = require("lodash");

export async function setSwaggerResponse(app) {
  expressOasGenerator.handleResponses(app, {
    predefinedSpec: (spec: any) => {
      _.set(spec, "securityDefinitions.token", {
        type: "apiKey",
        in: "header",
        name: "token",
      });

      /* LOGIN */
      _.set(spec, "paths['/auth/login'].post.tags", ["User"]);
      _.set(spec, "paths['/auth/login'].post.parameters", [
        {
          in: "body",
          name: "user",
          schema: {
            type: "object",
            required: ["email", "password"],
            properties: {
              email: { type: "string" },
              password: { type: "string" },
            },
          },
        },
      ]);
      _.set(spec, "paths['/auth/login'].post.security", []);

      /* REGISTER */
      _.set(spec, "paths['/auth/register'].post.tags", ["User"]);
      _.set(spec, "paths['/auth/register'].post.parameters", [
        {
          in: "body",
          name: "user",
          schema: {
            type: "object",
            required: ["email", "password"],
            properties: {
              email: { type: "string" },
              password: { type: "string" },
            },
          },
        },
      ]);
      _.set(spec, "paths['/auth/register'].post.security", []);

      _.set(spec, "paths['/user-type'].post.security", [{ token: [] }]);

      return spec;
    },
    specOutputPath: "./src/api-docs/swagger.json",
    mongooseModels: mongoose.modelNames(),
    alwaysServeDocs: true,
    specOutputFileBehavior: "",
    swaggerDocumentOptions: undefined,
  });
}

export async function setSwaggerRequest() {
  expressOasGenerator.handleRequests();
}
