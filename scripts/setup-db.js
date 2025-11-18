import pkg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const { Client } = pkg;
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

async function setupDatabase() {
  try {
    console.log('🔌 Conectando a la base de datos...');
    await client.connect();
    console.log('✓ Conectado exitosamente');

    console.log('📝 Leyendo schema.sql...');
    const schemaPath = join(__dirname, '..', 'database', 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    console.log('⚙️  Ejecutando schema...');
    await client.query(schema);
    
    console.log('✅ Schema creado exitosamente');
    console.log('✓ Tabla usuarios creada');
    console.log('✓ Tabla proyectos creada');
    console.log('✓ Índices creados\n');
  } catch (error) {
    console.error('❌ Error al crear el schema:', error.message);
    process.exit(1);
  } finally {
    await client.end();
    console.log('👋 Conexión cerrada');
  }
}

setupDatabase();
