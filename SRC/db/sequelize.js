const { Sequelize, DataTypes } = require("sequelize");
const PokemonModel = require("../models/pokemon");
const Usermodel = require("../models/user");
const pokemons = require("./mock-pokemon");
const bcrypt = require("bcrypt");

const sequelize = new Sequelize("pokedex", "root", "", {
  host: "localhost",
  dialect: "mariadb",
  dialectOptions: {
    timezone: "Etc/GMT-11",
  },
  logging: false,
});

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = Usermodel(sequelize, DataTypes);

const initDb = () => {
  return sequelize.sync({ force: true }).then((_) => {
    pokemons.map((pokemon) => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types,
      }).then((pokemon) => console.log(pokemon.toJSON()));
    });

    // encryptage du mot de passe
    bcrypt
      .hash("pikatchu", 10)
      .then((hash) =>
        User.create({ username: "pikatchu", password: hash }).then((user) =>
          console.log(user.toJSON())
        )
      );
    console.log("La base de donnée a bien été initialisée !");
  });
};

module.exports = {
  initDb,
  Pokemon,
  User,
};
