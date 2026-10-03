-- Ejecuta esto una sola vez en tu base de datos PostgreSQL en la nube
-- (por ejemplo, en el "SQL Editor" de Neon o Supabase, o con psql).

CREATE TABLE IF NOT EXISTS pokemons (
  id SERIAL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  type VARCHAR(50) NOT NULL,
  height INTEGER NOT NULL,
  weight INTEGER NOT NULL,
  image TEXT
);
