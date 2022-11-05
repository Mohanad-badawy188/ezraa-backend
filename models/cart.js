const mongoose = require("mongoose");

var Schema = mongoose.Schema;
let cartSchema = new Schema(
  {
    userId: { type: String, required: true },
    products: 
      {
        product: {
          type: Object,
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    
    planter:{type:String},
    planterName:{type:String},
    

  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
