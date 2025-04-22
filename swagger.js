// swagger.js
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Ecommerce API (Suzair)',
      version: '1.0.0',
      description: 'Ecommerce API documentation (Suzair)',
    },
    servers: [
      {
        url: 'http://localhost:3001', // Change this to your domain if hosted
      },
    ],
  },
  apis: [
    './admin/products/docs/swagger_docs.js',
    './client/user/docs/swagger_docs.js'
  ] // path where your route files are
};

const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
