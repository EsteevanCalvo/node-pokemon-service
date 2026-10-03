# Microservicio de Pokemon (Node.js + PostgreSQL)

Microservicio REST en Express que lee y escribe 10 Pokemon en una base de
datos PostgreSQL alojada en la nube. Documentado con Swagger.

## Correrlo en tu computadora

1. `npm install`
2. Copia `.env.example` a `.env` y coloca tu `DATABASE_URL` real.
3. Crea la tabla: ejecuta el contenido de `schema.sql` en tu base de datos
   (en el SQL Editor de Neon/Supabase, o con `psql $DATABASE_URL -f schema.sql`).
4. Inserta los 10 Pokemon de ejemplo: `npm run seed`
5. Arranca el servidor: `npm start`
6. Abre `http://localhost:3001/api-docs` para ver la documentación Swagger.

## Desplegarlo públicamente (Render)

1. Sube esta carpeta a un repositorio de GitHub (sin la carpeta
   `node_modules`, ya está en `.gitignore`).
2. En https://render.com crea un **New Web Service** apuntando a ese repo.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. En la sección **Environment**, agrega la variable `DATABASE_URL` con tu
   cadena de conexión real (la misma que usaste en `.env`).
6. Despliega. Cuando termine, tu servicio quedará en una URL como
   `https://tu-servicio.onrender.com`.
7. La documentación pública quedará en
   `https://tu-servicio.onrender.com/api-docs` — ese es el link que debes
   entregar.

(Railway funciona igual: crea el servicio desde el repo, define la misma
variable de entorno `DATABASE_URL`, Railway detecta Node.js automáticamente.)

## Endpoints

| Método | Ruta                | Descripción            |
|--------|---------------------|-------------------------|
| GET    | /api/pokemons       | Lista los 10 Pokemon    |
| GET    | /api/pokemons/:id   | Obtiene uno por id      |
| POST   | /api/pokemons       | Crea uno nuevo          |
| PUT    | /api/pokemons/:id   | Actualiza uno           |
| DELETE | /api/pokemons/:id   | Elimina uno             |
| GET    | /api-docs           | Documentación Swagger   |
