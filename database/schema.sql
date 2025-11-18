-- Crear base de datos
-- CREATE DATABASE proyectos_db;

-- Conectarse a la base de datos
-- \c proyectos_db;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de proyectos
CREATE TABLE IF NOT EXISTS proyectos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(200) NOT NULL,
    descripcion TEXT,
    imagenes TEXT[], -- Array de strings (imágenes en base64 o URLs)
    stack VARCHAR(100)[],  -- Array de tecnologías
    tags VARCHAR(50)[],    -- Array de etiquetas
    creador VARCHAR(100),  -- Nombre del creador original (texto libre)
    demo_url VARCHAR(500), -- URL de la demo del proyecto
    activo BOOLEAN DEFAULT TRUE, -- Borrado lógico
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_proyectos_created ON proyectos(created_at DESC);
