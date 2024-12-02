// import { orderModel } from "../models/orderModel.js";
// import userModel from "../models/userModel.js";
// import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// // place order
// const placeOrder = async (req, res) => {
//   const frontend_url = "http://localhost:5173";
//   try {
//     const newOrder = new orderModel({
//       userId: req.body.userId,
//       items: req.body.items,
//       amount: req.body.amount,
//       address: req.body.address,
//     });
//     await newOrder.save();
//     await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

//     // payment links
//     const line_items = req.body.items.map((item) => ({
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: item.price * 100 * 80,
//       },
//       quantity: item.quantity,
//     }));
//     line_items.push({
//       price_data: {
//         currency: "inr",
//         product_data: {
//           name: "Delivery Charges",
//         },
//         unit_amount: 2 * 100 * 80,
//       },
//       quantity: 1,
//     });

//     const session = await stripe.checkout.sessions.create({
//       line_items: line_items,
//       mode: "Payment",
//       success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
//       cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
//     });
//     res.json({ success: true, session_url: session.url });
//   } catch (error) {
//     console.log(error);
//     res.json({
//       success: false,
//       message: "Error ",
//     });
//   }
// };

// export { placeOrder };

import { orderModel } from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// place order
const placeOrder = async (req, res) => {
  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      payment: true, // Since it's COD, mark payment as true
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    res.json({ success: true, message: "Order placed successfully with COD." });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error placing order.",
    });
  }
};

const userOrder = async (req, res) => {
  try {
    const orders = await orderModel
      .find({ userId: req.body.userId })
      .sort({ date: -1 });
    console.log("Fetched Orders", orders);
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error getting orders.",
    });
  }
};

// Order List
const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).sort({ date: 1 }); // Latest Order first
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error getting orders.",
    });
  }
};

// api for updating Order Status
const updateStatus = async (req, res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Order status updated" });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error updating order status.",
    });
  }
};

export { placeOrder, userOrder, listOrders, updateStatus };
