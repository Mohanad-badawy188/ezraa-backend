const mongoose = require("mongoose");

var Schema = mongoose.Schema;
let productSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    imgURL: { type: String, required: true },
    price: { type: Number, required: true },
    desc: { type: String },
    categories :{type:Array },
    inStock :{type : Boolean ,default: true}
    
  },
  { timestamps: true }
);

const Product = mongoose.model("Products", productSchema);

module.exports = Product;
