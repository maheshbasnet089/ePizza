const Order = require("../../../models/order");
const moment = require("moment");

function orderController() {
  return {
    order(req, res) {
      const { phone, address } = req.body;
      if (!phone || !address) {
        req.flash("error", "Fill out All Fields");
        return res.redirect("/cart");
      }

      const order = new Order({
        customerId: req.user._id,
        phone,
        address,
        items: req.session.cart.items,
      });
      order
        .save()
        .then((result) => {
          req.flash("success", "Order placed Sucesfully");
          delete req.session.cart;

          res.redirect("/customer/orders");
        })
        .catch((err) => {
          req.flash("error", "Something went Wrong");
          res.redirect("/cart");
        });
    },
    async index(req, res) {
      const orders = await Order.find({ customerId: req.user._id }, null, {
        sort: { createdAt: -1 },
      });
      res.header(
        "Cache-Control",
        "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
      );
      res.render("customers/orders", { orders, moment });
    },
    async show(req, res) {
      try {
        const order = await Order.findById(req.params.id);
        // Authorize user
        if (req.user._id.toString() === order.customerId.toString()) {
          return res.render("customers/singlePageOrder", { order });
        }
      } catch (e) {
        res.redirect("/");
      }
    },
  };
}

module.exports = orderController;
