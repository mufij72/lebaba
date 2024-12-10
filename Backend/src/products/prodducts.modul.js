const  mongoose  = require("mongoose");

const ProductShema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  category: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    require: true,
  },
  oldPrice: { type: Number },
  image: { type: String },
  color: { type: String },
  rating: { type: Number, default: 0 },
  author: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    require: true,
  },
});
const Products = mongoose.model("Product", ProductShema);
module.exports = Products;
