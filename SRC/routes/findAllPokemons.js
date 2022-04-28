const { Pokemon } = require("../db/sequelize");
const pokemon = require("../models/pokemon");

module.exports = (app) => {
  app.get("/api/pokemons", (req, res) => {
    if (req.query.name) {
      const name = req.query.name;
      return Pokemon.findAll({ where: { name: name } }).then((pokemons) => {
        const message = `Il y'a ${pokemons.length} pokémons qui correspondent au terme de recherches ${name}`;
        res.json({ message, data: pokemons });
      });
    } else {
      Pokemon.findAll()
        .then((pokemons) => {
          const message = "La liste des pokémons a bien été récupérée.";
          res.json({ message, data: pokemons });
        })
        .catch((error) => {
          const message = `La liste de pokémons n'a pas pu être récupérée. Réesayer dans quelques instants.`;
          res.status(500).json({ message, data: error });
        });
    }
  });
};
