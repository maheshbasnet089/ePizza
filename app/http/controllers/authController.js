const User = require("../../models/user");
const bcrypt = require("bcryptjs");

function authController() {
  return {
    login(req, res) {
      res.render("auth/login");
    },
    register(req, res) {
      res.render("auth/register");
    },
    async postRegister(req, res) {
      const { name, email, password } = req.body;
      if (!name || !email || !password) {
        req.flash("error", "Fill Out All fields");
        req.flash("name", name);
        req.flash("email", email);
        req.flash("password", password);
        return res.redirect("/register");
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      //if email already exists
      User.exists({ email: email }, (err, result) => {
        if (result) {
          req.flash("error", "Email already taken");
          req.flash("name", name);
          req.flash("email", email);
          return res.redirect("/register");
        }
      });
      const user = new User({
        name,
        email,
        password: hashedPassword,
      });
      user
        .save()
        .then((result) => {
          //login
          return res.redirect("/");
        })
        .catch((err) => {
          req.flash("error", "Something went wrong");
          return res.redirect("/register");
        });
    },
  };
}

module.exports = authController;
