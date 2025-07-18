import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

const currency = "sar";
const delivery_chage = 10;

const placeOrder = async (req, res) => {
  try {
    const { userId, address, amount, items } = req.body;
    const orderData = {
      items,
      address,
      amount,
      userId,
      paymentMethod: "COD",
      payment: false,
      date: Date.now(),
    };
    await orderModel.create(orderData);
    await userModel.findByIdAndUpdate(userId, { cartData: {} }, { new: true });

    req.json({success: true, message:"order place success"})

  } catch (error) {
    console.log(error);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderModel.find();
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
  }
};

const userOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.find({ userId });
    res.json({ success: true, orders });
  } catch (error) {
    console.log(error);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;

    await orderModel.findByIdAndUpdate(orderId, { status }, { new: true });
    res.json({success:true, message: "status updated"})
  } catch (error) {
    console.log(error);
    
  }
};

export { placeOrder, getAllOrders, userOrders ,updateOrderStatus };
