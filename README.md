# Backend de Proyectos

API REST con autenticación y gestión de proyectos construida con Node.js, Express y PostgreSQL.

## 🚀 Características

- ✅ Autenticación con JWT
- ✅ Registro y login de usuarios
- ✅ CRUD completo de proyectos
- ✅ Soporte para imágenes en base64
- ✅ Paginación de resultados
- ✅ Protección de rutas con middleware
- ✅ Validaciones de datos

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- PostgreSQL (v12 o superior)
- npm o yarn

## 🔧 Instalación

1. **Clonar el repositorio**
```bash
git clone <tu-repositorio>
cd backend-Proyectos
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Copiar el archivo de ejemplo
cp .env.example .env

# Editar .env con tus credenciales
```

Configuración del archivo `.env`:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=proyectos_db

PORT=3000

JWT_SECRET=tu_clave_secreta_muy_segura
JWT_EXPIRES_IN=7d
```

4. **Crear la base de datos**
```bash
# Conectarse a PostgreSQL
psql -U postgres

# Crear la base de datos
CREATE DATABASE proyectos_db;

# Salir de psql
\q
```

5. **Ejecutar el script SQL**
```bash
psql -U postgres -d proyectos_db -f database/schema.sql
```

## 🏃‍♂️ Ejecutar el Proyecto

### Modo desarrollo (con nodemon)
```bash
npm run dev
```

### Modo producción
```bash
npm start
```

El servidor estará corriendo en `http://localhost:3000`

## 📡 API Endpoints

### Autenticación

#### Registrar Usuario
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "usuario123",
  "password": "password123"
}
```

#### Iniciar Sesión
```http
POST /api/auth/login
Content-Type: application/json

{
  "username": "usuario123",
  "password": "password123"
}
```

Respuesta:
```json
{
  "message": "Login exitoso",
  "user": {
    "id": 1,
    "username": "usuario123",
    "created_at": "2024-01-01T00:00:00.000Z"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Obtener Perfil
```http
GET /api/auth/profile
Authorization: Bearer <token>
```

### Proyectos

#### Obtener Todos los Proyectos (Público)
```http
GET /api/projects?page=1&limit=10
```

#### Obtener Proyecto por ID (Público)
```http
GET /api/projects/:id
```

#### Crear Proyecto (Requiere autenticación)
```http
POST /api/projects
Authorization: Bearer <token>
Content-Type: application/json

{
  "titulo": "Mi Proyecto",
  "descripcion": "Descripción del proyecto",
  "imagenes": ["data:image/png;base64,...", "data:image/jpeg;base64,..."],
  "stack": ["Node.js", "React", "PostgreSQL"],
  "tags": ["web", "fullstack", "api"],
  "creador": "Sebastián"
}
```

#### Actualizar Proyecto (Requiere autenticación)
```http
PUT /api/projects/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "titulo": "Título actualizado",
  "descripcion": "Nueva descripción",
  "creador": "Sebastián"
}
```

#### Eliminar Proyecto (Requiere autenticación)
```http
DELETE /api/projects/:id
Authorization: Bearer <token>
```

## 🗂️ Estructura del Proyecto

```
backend-Proyectos/
├── database/
│   └── schema.sql          # Esquema de base de datos
├── src/
│   ├── config/
│   │   └── database.js     # Configuración de PostgreSQL
│   ├── controllers/
│   │   ├── authController.js    # Lógica de autenticación
│   │   └── projectController.js # Lógica de proyectos
│   ├── middleware/
│   │   └── auth.js         # Middleware de autenticación JWT
│   ├── routes/
│   │   ├── auth.js         # Rutas de autenticación
│   │   └── projects.js     # Rutas de proyectos
│   └── index.js            # Punto de entrada
├── .env.example            # Ejemplo de variables de entorno
├── .gitignore
├── package.json
└── README.md
```

## 🗄️ Esquema de Base de Datos

### Tabla `usuarios`
- `id` (SERIAL PRIMARY KEY)
- `username` (VARCHAR, UNIQUE)
- `password` (VARCHAR)
- `created_at` (TIMESTAMP)

### Tabla `proyectos`
- `id` (SERIAL PRIMARY KEY)
- `titulo` (VARCHAR)
- `descripcion` (TEXT)
- `imagenes` (TEXT[]) - Array de imágenes en base64 o URLs
- `stack` (VARCHAR[]) - Array de tecnologías
- `tags` (VARCHAR[]) - Array de etiquetas
- `creador` (VARCHAR) - Nombre del creador original (texto libre)
- `created_at` (TIMESTAMP)
- `updated_at` (TIMESTAMP)

## 🔐 Seguridad

- Las contraseñas se encriptan con bcrypt
- Autenticación basada en JWT
- Tokens con expiración configurable
- Validación de datos de entrada
- Protección de rutas sensibles

## 📝 Notas

- Las imágenes se almacenan como strings en un array (pueden ser URLs o base64)
- El límite de tamaño de payload está configurado en 50MB para soportar imágenes en base64
- El campo `creador` es texto libre, no hace referencia al usuario que publica
- Cualquier usuario autenticado puede crear, actualizar o eliminar proyectos
- La paginación está disponible en la ruta de listado de proyectos
- Las rutas públicas permiten ver los proyectos sin autenticación
- Las operaciones de escritura (crear/actualizar/eliminar) requieren estar autenticado

## 🛠️ Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **PostgreSQL** - Base de datos
- **bcryptjs** - Encriptación de contraseñas
- **jsonwebtoken** - Autenticación JWT
- **dotenv** - Variables de entorno
- **cors** - Manejo de CORS
- **pg** - Cliente de PostgreSQL

## 📄 Licencia

ISC
