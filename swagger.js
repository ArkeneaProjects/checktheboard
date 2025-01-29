// swagger.js
const swaggerJsDoc = require('swagger-jsdoc');
const constants = require('./app/config/constants');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Check The Board Mobile API',
      version: '1.0.0',
      description: 'API Docs of Check The Board for Sales Rep',
    
      contact: {
        name: "API Support",
      },
    },
    servers: [
      {
        url: constants.clientUrl+"/mobileApi/users/",
        description: "Check The Board API Documentation",
      },
    ],
    components: {
      securitySchemes: {
        basicAuth: {
          type: 'http',
          scheme: 'basic',
        },
      },
    },
    security: [
      {
        basicAuth: [],
      },
    ],
  },
  apis: ['./app/routes/mobileApiRoutes.js'], // Path to your API route files
};

const swaggerSpec = swaggerJsDoc(options);

module.exports = swaggerSpec;