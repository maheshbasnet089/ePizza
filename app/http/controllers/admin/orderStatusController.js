const Order = require("../../../models/order");
function orderStatusController() {
  return {
    update(req, res) {
      console.log(req.body);
      Order.updateOne(
        { _id: req.body.orderId },
        { status: req.body.status },
        (err, data) => {
          if (err) {
            return res.redirect("/admin/orders");
          }
          return res.redirect("/admin/orders");
        }
      );
    },
  };
}

module.exports = orderStatusController;
