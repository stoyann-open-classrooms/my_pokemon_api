const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const privateKey = require("../auth/private_keys");

module.exports = (app) => {
  app.post("/api/login", (req, res) => {
    User.findOne({ where: { username: req.body.username } })
      .then((user) => {
        if (!user) {
          const message = `L'uttilisateur demandé n'éxiste pas `;
          res.status(404).json({ message });
        }

        bcrypt
          .compare(req.body.password, user.password)
          .then((isPasswordValid) => {
            if (!isPasswordValid) {
              const message = `Le mot de passe est incorect`;
              res.status(401).json({ message });
            }

            //jwt
            const token = jwt.sign({ userId: user.id }, privateKey, {
              expiresIn: "24h",
            });
            const message = `L'utilisateur a été connecté avec succès`;
            return res.json({ message, data: user, token });
          });
      })
      .catch((error) => {
        const message = `L'utilisateur n'a pas pu être connecté. Reesayer dans quelque instants.`;
        return res.json({ message, data: error });
      });
  });
};
