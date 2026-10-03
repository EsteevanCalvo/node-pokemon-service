require("dotenv").config();
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
const pool = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /:
 *   get:
 *     summary: Verifica que el microservicio esté activo
 *     responses:
 *       200:
 *         description: Mensaje de estado
 */
app.get("/", (req, res) => {
  res.json({
    mensaje: "Microservicio de Pokemon funcionando",
    documentacion: "/api-docs",
  });
});

/**
 * @swagger
 * /api/pokemons:
 *   get:
 *     summary: Lista todos los Pokemon almacenados en la base de datos
 *     tags: [Pokemons]
 *     responses:
 *       200:
 *         description: Lista de Pokemon
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pokemon'
 */
app.get("/api/pokemons", async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM pokemons ORDER BY id ASC"
    );
    res.json(resultado.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al consultar los pokemones" });
  }
});

/**
 * @swagger
 * /api/pokemons/{id}:
 *   get:
 *     summary: Obtiene un Pokemon por su id
 *     tags: [Pokemons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pokemon encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 *       404:
 *         description: No encontrado
 */
app.get("/api/pokemons/:id", async (req, res) => {
  try {
    const resultado = await pool.query(
      "SELECT * FROM pokemons WHERE id = $1",
      [req.params.id]
    );
    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Pokemon no encontrado" });
    }
    res.json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al consultar el pokemon" });
  }
});

/**
 * @swagger
 * /api/pokemons:
 *   post:
 *     summary: Crea un nuevo Pokemon
 *     tags: [Pokemons]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NuevoPokemon'
 *     responses:
 *       201:
 *         description: Pokemon creado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pokemon'
 */
app.post("/api/pokemons", async (req, res) => {
  try {
    const { name, type, height, weight, image } = req.body;

    if (!name || !type || !height || !weight) {
      return res.status(400).json({
        error: "name, type, height y weight son obligatorios",
      });
    }

    const resultado = await pool.query(
      "INSERT INTO pokemons (name, type, height, weight, image) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [name, type, height, weight, image || null]
    );

    res.status(201).json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al crear el pokemon" });
  }
});

/**
 * @swagger
 * /api/pokemons/{id}:
 *   put:
 *     summary: Actualiza un Pokemon existente
 *     tags: [Pokemons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/NuevoPokemon'
 *     responses:
 *       200:
 *         description: Pokemon actualizado
 *       404:
 *         description: No encontrado
 */
app.put("/api/pokemons/:id", async (req, res) => {
  try {
    const { name, type, height, weight, image } = req.body;

    const resultado = await pool.query(
      `UPDATE pokemons
       SET name = $1, type = $2, height = $3, weight = $4, image = $5
       WHERE id = $6
       RETURNING *`,
      [name, type, height, weight, image, req.params.id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Pokemon no encontrado" });
    }

    res.json(resultado.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al actualizar el pokemon" });
  }
});

/**
 * @swagger
 * /api/pokemons/{id}:
 *   delete:
 *     summary: Elimina un Pokemon
 *     tags: [Pokemons]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pokemon eliminado
 *       404:
 *         description: No encontrado
 */
app.delete("/api/pokemons/:id", async (req, res) => {
  try {
    const resultado = await pool.query(
      "DELETE FROM pokemons WHERE id = $1 RETURNING *",
      [req.params.id]
    );

    if (resultado.rows.length === 0) {
      return res.status(404).json({ error: "Pokemon no encontrado" });
    }

    res.json({ mensaje: "Pokemon eliminado", pokemon: resultado.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al eliminar el pokemon" });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Microservicio de Pokemon escuchando en el puerto ${PORT}`);
  console.log(`Documentacion Swagger en /api-docs`);
});
