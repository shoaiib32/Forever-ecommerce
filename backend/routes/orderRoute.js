import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
  getAllOrders,
  placeOrder,
  updateOrderStatus,
  userOrders,
} from "../controllers/orderController.js";
import isAuthorized from "../middleware/auth.js";


const orderRouter = express.Router();

orderRouter.get("/list", adminAuth, getAllOrders);
orderRouter.put("/status", adminAuth, updateOrderStatus);
orderRouter.put("/place", isAuthorized, placeOrder);

orderRouter.get("/user-orders", isAuthorized, userOrders);

export default orderRouter