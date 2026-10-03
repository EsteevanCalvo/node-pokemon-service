const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Pokemon",
      version: "1.0.0",
      description:
        "Microservicio en Node.js + Express que consume una base de datos PostgreSQL en la nube con 10 Pokemon.",
    },
    servers: [
      {
        url: "/",
        description: "Servidor actual",
      },
    ],
    components: {
      schemas: {
        Pokemon: {
          type: "object",
          properties: {
            id: { type: "integer", example: 1 },
            name: { type: "string", example: "pikachu" },
            type: { type: "string", example: "electric" },
            height: { type: "integer", example: 4 },
            weight: { type: "integer", example: 60 },
            image: {
              type: "string",
              example:
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
            },
          },
        },
        NuevoPokemon: {
          type: "object",
          required: ["name", "type", "height", "weight"],
          properties: {
            name: { type: "string", example: "pikachu" },
            type: { type: "string", example: "electric" },
            height: { type: "integer", example: 4 },
            weight: { type: "integer", example: 60 },
            image: { type: "string" },
          },
        },
      },
    },
  },
  // Lee los comentarios @swagger escritos encima de cada ruta en server.js
  apis: ["./server.js"],
};

module.exports = swaggerJsdoc(options);
