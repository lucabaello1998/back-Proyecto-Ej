import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Proyectos',
      version: '1.0.0',
      description: 'API REST con autenticación y gestión de proyectos',
      contact: {
        name: 'API Support',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Ingresa el token JWT obtenido del login',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID del usuario',
            },
            username: {
              type: 'string',
              description: 'Nombre de usuario',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
            },
          },
        },
        Project: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              description: 'ID del proyecto',
            },
            titulo: {
              type: 'string',
              description: 'Título del proyecto',
            },
            descripcion: {
              type: 'string',
              description: 'Descripción del proyecto',
            },
            imagenes: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Array de imágenes en base64 o URLs',
            },
            stack: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Tecnologías utilizadas',
            },
            tags: {
              type: 'array',
              items: {
                type: 'string',
              },
              description: 'Etiquetas del proyecto',
            },
            creador: {
              type: 'string',
              description: 'Nombre del creador original',
            },
            created_at: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
            },
            updated_at: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de última actualización',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Mensaje de error',
            },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.js'], // Ruta a los archivos con anotaciones
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
