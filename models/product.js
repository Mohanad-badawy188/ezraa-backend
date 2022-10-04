const mongoose = require("mongoose");

var Schema = mongoose.Schema;
let productSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    imgURL: { type: String, required: true },
    price: { type: Number, required: true },
    desc: { type: String },
    planter : {type:Array},
    categories :{type:Array }
    
  },
  { timestamps: true }
);

const Product = mongoose.model("Products", productSchema);

module.exports = Product;
