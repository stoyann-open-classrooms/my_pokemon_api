const validTypes = [
  "Plante",
  "Poison",
  "Feu",
  "Eau",
  "Insecte",
  "Vol",
  "Normal",
  "Electrik",
  "Fée",
];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pokedex",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Le nom de ce pokémon est déjà pris.",
        },
        validate: {
          notEmpty: {
            msg: "Le nom du pokémon ne peut pas être vides.",
          },
          notNull: {
            msg: "Le nom du pokémon est une proprieté requise.",
          },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: "Les points de de vie doivent être supérieur ou égale a 0.",
          },
          max: {
            args: [999],
            msg: "Les points de de vie ne peuvent pas être suppérieur a 999",
          },
          isInt: {
            msg: "Utilisez uniquement de nombres entiers pour les points de vie. ",
          },
          notNull: {
            msg: "Les points de vie sont une propriéte requise",
          },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: "Les points de de dêgats doivent être supérieur ou égale a 0.",
          },
          max: {
            args: [999],
            msg: "Les points de de dêgats ne peuvent pas être suppérieur a 999",
          },
          isInt: {
            msg: "Utilisez uniquement de nombres entiers pour les points de degats. ",
          },
          notNull: {
            msg: "Les points de degats sont une propriéte requise",
          },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: {
            msg: "Utillisez une URL valide pour l'image du pokémon",
          },
          notNull: {
            msg: "L'image pour le pokémon est requise'",
          },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue("types").split(" ");
        },
        set(types) {
          this.setDataValue("types", types.join());
        },
        validate: {
          isTypesValid(value) {
            if (!value) {
              throw new Error("Un pokémon doit au moins avoir un type. ");
            }
            if (value.split(",").length > 3) {
              throw new Error(
                "Un pokémon ne peut pas avoir plus de trois types"
              );
            }
            value.split(",").forEach((type) => {
              if (!validTypes.includes(type)) {
                throw new Error(
                  `Le type d'un pokémon doit appartenir à la liste suivante : ${validTypes}`
                );
              }
            });
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
    }
  );
};
