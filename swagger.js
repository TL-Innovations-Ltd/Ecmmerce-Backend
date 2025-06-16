// swagger.js
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ecommerce API (Suzair)",
      version: "1.0.0",
      description: "Ecommerce API documentation (Suzair)",
    },
    servers: [
      {
        url: "http://localhost:3001", // Change this to your domain if hosted
      },
    ],
  },
  apis: [
    "./src/admin/products/docs/swagger_docs.js",
    "./src/client/user/docs/swagger_docs.js",
    "./src/client/cart/docs/swagger_docs.js",
    "./src/admin/category/docs/swagger_docs.js",
    "./src/client/order/docs/swagger_docs.js",
    "./src/admin/slides_show/docs/swagger_docs.js",
    "./src/admin/products/docs/light_config_swagger.js",
  ], // path where your route files are
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
