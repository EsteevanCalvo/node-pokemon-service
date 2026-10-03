require("dotenv").config();
const { Pool } = require("pg");

if (!process.env.DATABASE_URL) {
  console.error(
    "Falta la variable de entorno DATABASE_URL. Revisa tu archivo .env (ver .env.example)."
  );
}

// La mayoria de proveedores de Postgres en la nube (Neon, Render, Supabase)
// exigen SSL. rejectUnauthorized: false evita problemas con certificados
// autofirmados en estos servicios gratuitos.
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

pool.on("error", (err) => {
  console.error("Error inesperado en el pool de PostgreSQL:", err);
});

module.exports = pool;
