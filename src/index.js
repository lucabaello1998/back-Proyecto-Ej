import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './config/swagger.js';
import authRoutes from './routes/auth.js';
import projectRoutes from './routes/projects.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' })); // Aumentado para soportar imágenes en base64
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'API de Proyectos - Documentación',
  customCss: '.swagger-ui .topbar { display: none }',
}));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: 'API de Proyectos',
    version: '1.0.0',
    documentation: 'http://localhost:3000/api-docs',
    endpoints: {
      auth: {
        register: 'POST /api/auth/register',
        login: 'POST /api/auth/login',
        profile: 'GET /api/auth/profile'
      },
      projects: {
        public: {
          getAll: 'GET /api/projects',
          getById: 'GET /api/projects/:id'
        },
        authenticated: {
          create: 'POST /api/projects',
          update: 'PUT /api/projects/:id',
          delete: 'DELETE /api/projects/:id'
        }
      }
    }
  });
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📚 Documentación Swagger: http://localhost:${PORT}/api-docs\n`);
});
