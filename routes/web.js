const homeController = require("../app/http/controllers/homeController");
const authController = require("../app/http/controllers/authController");
const cartController = require("../app/http/controllers/customers/cartController");
const orderController = require("../app/http/controllers/customers/orderController");
const adminOrderController = require("../app/http/controllers/admin/orderController");
const orderStatusController = require("../app/http/controllers/admin/orderStatusController");

//Middlewares
const guest = require("../app/http/middlewares/guest");

const auth = require("../app/http/middlewares/auth");
const admin = require("../app/http/middlewares/admin");

function initRoute(app) {
  app.get("/", homeController().index);
  app.get("/login", guest, authController().login);
  app.post("/login", authController().postLogin);
  app.get("/register", guest, authController().register);
  app.post("/register", authController().postRegister);
  app.post("/logout", authController().logout);

  app.get("/cart", cartController().index);
  app.post("/update-cart", cartController().update);

  //customer orders routes
  app.post("/orders", auth, orderController().order);
  app.get("/customer/orders", auth, orderController().index);

  //admin orders
  app.get("/admin/orders", admin, adminOrderController().index);
  app.post("/admin/orders/status", admin, orderStatusController().update);
}

module.exports = initRoute;
