const express = require("express");
const router = express.Router();
const {
  addToCart,
  getCart,
  updateCart,
  deleteCart,
  deleteUserCart
} = require("../controllers/cartController");


router.post("/cart", addToCart);
router.get("/cart/:userId", getCart);
router.patch("/cart/:id", updateCart);
router.delete("/cart/:id", deleteCart);
router.delete("/cart/user/:userId", deleteUserCart);

module.exports = router;