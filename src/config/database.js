import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  timezone: 'America/Argentina/Buenos_Aires',
});

// Configurar timezone para la sesión
pool.on('connect', (client) => {
  client.query("SET timezone = 'America/Argentina/Buenos_Aires'");
  console.log('✓ Conectado a PostgreSQL');
});

pool.on('error', (err) => {
  console.error('Error inesperado en la base de datos:', err);
  process.exit(-1);
});

export default pool;
