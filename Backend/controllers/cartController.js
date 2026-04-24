const Cart = require("../models/cartModel");

exports.addToCart = async (req, res) => {
  const item = await Cart.create(req.body);
  res.json(item);
};

exports.getCart = async (req, res) => {
  const items = await Cart.find({ userId: req.params.userId });
  res.json(items);
};

exports.updateCart = async (req, res) => {
  const item = await Cart.findByIdAndUpdate(
    req.params.id,
    { quantity: req.body.quantity },
    { new: true }
  );
  res.json(item);
};

exports.deleteCart = async (req, res) => {
  await Cart.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
};