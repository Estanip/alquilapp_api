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
            required: [
              "email",
              "password",
              "first_name",
              "last_name",
              "identification_number",
              "birth_date",
              "type_of_user",
              "member_status",
            ],
            properties: {
              email: { type: "string" },
              password: { type: "string" },
              first_name: { type: "string" },
              last_name: { type: "string" },
              identification_number: { type: "string" },
              birth_date: { type: "string", format: "date" },
              type_of_user: { type: "string" },
              member_status: { type: "string" },
            },
          },
        },
      ]);
      _.set(spec, "paths['/auth/register'].post.security", []);

      _.set(spec, "paths['/user-type'].post.tags", ["UserType"]);
      _.set(spec, "paths['/user-type'].post.parameters", [
        {
          in: "body",
          name: "user_type",
          schema: {
            type: "object",
            required: ["name", "status"],
            properties: {
              name: { type: "string" },
              status: { type: "string" },
            },
          },
        },
      ]);
      _.set(spec, "paths['/user-type'].post.security", [{ token: [] }]);

      _.set(spec, "paths['/member'].get.tags", ["Member"]);
      _.set(spec, "paths['/member'].get.security", [{ token: [] }]);

      _.set(spec, "paths['/member/filter'].get.tags", ["Member"]);
      _.set(spec, "paths['/member/filter'].get.parameters", [
        {
          in: "path",
        },
      ]);
      _.set(spec, "paths['/member/filter'].get.security", [{ token: [] }]);

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
