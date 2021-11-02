const homeController = require("../app/http/controllers/homeController");
const authController = require('../app/http/controllers/authController')
function initRoute(app) {
  app.get("/", homeController().index);
  app.get('/login', authController().login)
  app.get('/register', authController().register)
}

module.exports = initRoute;
