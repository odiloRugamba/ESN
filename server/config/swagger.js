const swaggerJsDoc = require("swagger-jsdoc");

const options = {
    swaggerDefinition: {
        info: {
            title: "Emergency Social Network API",
            decription: "Emergency Social Network API endpoints",
            contact: {
                name: "Team 2"
            },
            servers: ["http://localhost:5050"]
        }
    },
    // where to find the routes
    apis: ["./controllers/*.js"]
}

exports.swaggerDocs = swaggerJsDoc(options);