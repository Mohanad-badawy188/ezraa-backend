const mongoose = require("mongoose");

var Schema = mongoose.Schema;
let orderSchema = new Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
type: Object ,
required :true
      },
    ],
    amount: { type: Number, required: true },
    // address: { type: Object, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
