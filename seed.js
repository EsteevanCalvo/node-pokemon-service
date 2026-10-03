// Inserta 10 Pokemon de ejemplo en la base de datos.
// Uso: npm run seed   (necesita el archivo .env ya configurado)
require("dotenv").config();
const pool = require("./db");

const pokemons = [
  { name: "bulbasaur", type: "grass/poison", height: 7, weight: 69, id: 1 },
  { name: "charmander", type: "fire", height: 6, weight: 85, id: 4 },
  { name: "squirtle", type: "water", height: 5, weight: 90, id: 7 },
  { name: "pikachu", type: "electric", height: 4, weight: 60, id: 25 },
  { name: "jigglypuff", type: "normal/fairy", height: 5, weight: 55, id: 39 },
  { name: "gengar", type: "ghost/poison", height: 15, weight: 405, id: 94 },
  { name: "snorlax", type: "normal", height: 21, weight: 4600, id: 143 },
  { name: "mewtwo", type: "psychic", height: 20, weight: 1220, id: 150 },
  { name: "eevee", type: "normal", height: 3, weight: 65, id: 133 },
  { name: "charizard", type: "fire/flying", height: 17, weight: 905, id: 6 },
];

const imagenDe = (id) =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

async function seed() {
  try {
    await pool.query("DELETE FROM pokemons");

    for (const p of pokemons) {
      await pool.query(
        "INSERT INTO pokemons (name, type, height, weight, image) VALUES ($1, $2, $3, $4, $5)",
        [p.name, p.type, p.height, p.weight, imagenDe(p.id)]
      );
    }

    console.log(`Listo: se insertaron ${pokemons.length} pokemones.`);
  } catch (error) {
    console.error("Error al insertar los datos de ejemplo:", error.message);
  } finally {
    await pool.end();
  }
}

seed();
