const Menu = require("../../models/menu");
function homeController() {
  return {
    async index(req, res) {
      try {
        const pizzas = await Menu.find();
        console.log(pizzas);
        res.render("home", { pizzas: pizzas });
      } catch (err) {
        console.log(err);
      }
    },
  };
}

module.exports = homeController;
