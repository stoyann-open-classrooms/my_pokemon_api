// ======================= point de terminaison ====================

const express = require("express");
const helper = require("./helper");
const pokemons = require("./mock-pokemon");

const app = express();
// declaration du port de l'api rest
const port = 5000;

// End point
app.get("/", (req, res) => res.send("Bienvenue sur l'api rest Pokémon!"));

// enpoint  recuperation d'un pokemon avec  son id au format json
app.get("/api/pokemon/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  const message =
    "Votre requête c’est bien passer un Pokémon a bien été trouver";
  res.json(helper.success(message, pokemon));
});

// enpoint récuperation de tous les pokemons au format json

app.get("/api/pokemons", (req, res) => {
  const message = `Votre requête c’est bien passer une liste de ${pokemons.length} pokémons à été trouver.`;
  res.json(helper.success(message, pokemons));
});

// demarage de l'api rest sur le port 3000 et afficahge d'un message
app.listen(port, () =>
  console.log("Notre application Node est demarée sur le port 5000")
);
