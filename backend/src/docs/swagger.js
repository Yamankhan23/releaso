const swaggerJSDoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'CreatorHub API',
            version: '1.0.0',
            description: 'CreatorHub backend API docs'
        },
        servers: [{ url: '/api/v1' }]
    },
    apis: ['./src/routes/*.js', './src/models/*.js'] // not exhaustive, but enough for UI
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
