// backend/controllers/cartController.js
import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { userId, itemId, size } = req.body;  // userId now comes from the middleware
    let userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = {};
      cartData[itemId][size] = 1;
    }

    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    res.json({
      success: true,
      message: "User cart was added successfully",
      cartData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body; // userId from middleware
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    cartData[itemId][size] = quantity;
    await userModel.findByIdAndUpdate(userId, { cartData }, { new: true });

    res.json({ success: true, message: "User cart was updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const getUserCarts = async (req, res) => {
  try {
    const { userId } = req.body;  // userId from middleware
    const userData = await userModel.findById(userId);
    let cartData = userData.cartData || {};

    res.json({
      success: true,
      message: "User cart fetched successfully",
      cartData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export { addToCart, updateCart, getUserCarts };
