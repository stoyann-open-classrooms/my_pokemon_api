// ======================= point de terminaison ====================

const express = require("express");
const helper = require("./helper");
const pokemons = require("./mock-pokemon");

const app = express();
// declaration du port de l'api rest
const port = 5000;

// End point
app.get("/", (req, res) => res.send("Bienvenue sur l'api rest Pokémon!"));

app.get("/api/pokemon/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  const message =
    "Votre requête c’est bien passer un Pokémon a bien été trouver";
  res.json(helper.success(message, pokemon));
});

// End point nombre de pokémons dans le pokédex
app.get("/api/pokemons", (req, res) => {
  res.send(
    `Il y'a  ${pokemons.length} pokémons dans le pokédex, pour le moment`
  );
});

// demarage de l'api rest sur le port 3000 et afficahge d'un message
app.listen(port, () =>
  console.log("Notre application Node est demarée sur le port 5000")
);
