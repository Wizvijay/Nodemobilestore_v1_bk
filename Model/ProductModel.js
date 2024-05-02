var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    categoryname:{type: String, requried: true}
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
