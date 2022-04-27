// ======================= point de terminaison ====================
// Importation des paquets NPM
const express = require("express");
const morgan = require("morgan");
const helper = require("./helper");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const pokemons = require("./mock-pokemon");

const app = express();
// declaration du port de l'api rest
const port = 8000;

// ================================ les Middlewares ==========================
//les middlewares sont une fonctionnalitées d'express qui effectue des tâches trés diverse

//Les 5 types de middlewares:

// 1___ Les middlewares d'application
// 2___ Les middlewares de router
// 3___  Les middlewares de traitement d'erreurs
// 4___ Les middlewares intégré
// 5___ Le middlewares d'application
// 6___ Le middlewares tiers

// ++++++++++++++++ Middlewares avec le paquet morgan ++++++++++++++++
app.use(morgan("dev"));

app.use(bodyParser.json());
// ===========================================================================

// End point
app.get("/", (req, res) => res.send("Bienvenue sur l'api rest Pokémon!"));

// enpoint GET d'un pokemon avec  son id au format json
app.get("/api/pokemon/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemon = pokemons.find((pokemon) => pokemon.id === id);
  const message =
    "Votre requête c’est bien passer un Pokémon a bien été trouver";
  res.json(helper.success(message, pokemon));
});

// enpoint GET de tous les pokemons au format json

app.get("/api/pokemons", (req, res) => {
  const message = `Statut: Votre requête c’est bien passer une liste de ${pokemons.length} pokémons à été trouver.`;
  res.json(helper.success(message, pokemons));
});

// endpoint  POST d'un nouveau pokémon
app.post("/api/pokemons", (req, res) => {
  const id = helper.getUniqueId(pokemons);
  const pokemonCreated = { ...req.body, ...{ id: id, created: new Date() } };
  pokemons.push(pokemonCreated);
  const message = `Le pokémon ${pokemonCreated.name} a bien été crée.`;
  res.json(helper.success(message, pokemonCreated));
});

// endpoint PUT modifier un pokémon
app.put("/api/pokemons/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const pokemonUpdated = { ...req.body, id: id };
  pokemons.map((pokemon) => {
    return pokemon.id === id ? pokemonUpdated : pokemon;
  });

  const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`;
  res.json(helper.success(message, pokemonUpdated));
});

// demarage de l'api rest sur le port 3000 et afficahge d'un message
app.listen(port, () =>
  console.log("Notre application Node est demarée sur le port 8080")
);
