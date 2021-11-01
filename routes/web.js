const homeController = require("../app/http/controllers/homeController");
function initRoute(app) {
  app.get("/", homeController().index);
}

module.exports = initRoute;
