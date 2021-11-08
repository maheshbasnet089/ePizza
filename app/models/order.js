const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    phone: {
      type: Number,
      required: [true, "why no phone?"],
    },
    address: {
      type: String,
      required: [true, "why no address?"],
    },
    items: {
      type: Object,
      required: [true, "why no items?"],
    },
    paymentType: {
      type: String,
      default: "COD",
    },
    status: {
      type: String,
      default: "order_placed",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
