// ======================= point de terminaison ====================
// Importation des paquets NPM
const express = require("express");
const app = express();
const morgan = require("morgan");

const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const sequelize = require("./src/db/sequelize");
// declaration du port de l'api rest
const port = 2100;

// ++++++++++++++++ Middlewares avec le paquet morgan ++++++++++++++++
app.use(morgan("dev"));

app.use(bodyParser.json());
//  TODO :  ici les futurs points de terminaison
sequelize.initDb();
require("./src/routes/findAllPokemons")(app);
require("./src/routes/findPokemonByPk")(app);
require("./src/routes/createPokemon")(app);

// demarage de l'api rest sur le port 3000 et afficahge d'un message
app.listen(port, () =>
  console.log("Notre application Node est demarée sur le port 2000")
);
