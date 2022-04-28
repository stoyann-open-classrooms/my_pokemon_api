const { User } = require("../db/sequelize");
const bcrypt = require("bcrypt");

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
            const message = `L'utilisateur a été connecté avec succès`;
            return res.json({ message, data: user });
          });
      })
      .catch((error) => {
        const message = `L'utilisateur n'a pas pu être connecté. Reesayer dans quelque instants.`;
        return res.json({ message, data: error });
      });
  });
};
