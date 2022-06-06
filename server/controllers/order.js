const Order = require("../models/orderModel");
const Product = require("../models/productModel");

//create new order
exports.createOrder = async (req, res) => {
  try {
    const {
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    const order = await Order.create({
      shippingInfo,
      orderItems,
      paymentInfo,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      paidAt: Date.now(),
      user: req.user._id,
    });

    res
      .status(200)
      .json({ success: true, message: "Order created successfully", order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get single order
exports.getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get logged in user orders
exports.userOrders = async (req, res) => {
  try {
    const order = await Order.find({ user: req.user._id });
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    res.status(200).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//get all orders
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    if (!orders) {
      return res
        .status(404)
        .json({ success: false, message: "Orders not found" });
    }
    let totalAmount = 0;
    orders.forEach((order) => (totalAmount += order.totalPrice));
    res.status(200).json({ success: true, totalAmount, orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

//update order status
exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    if (order.orderStatus === "Delivered") {
      return res.status(400).json({
        success: false,
        message: "You have already Deliverd this order",
      });
    }
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(
        async (o) => await updateStock(o.product, o.quantity)
      );
    }
    order.orderStatus = req.body.status;
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
    await order.save();
    res
      .status(200)
      .json({ success: true, message: "Order updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

async function updateStock(productId, quantity) {
  const product = await Product.findById(productId);
  product.stock = product.stock - quantity;
  await product.save();
}

//delete order
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    await order.remove();
    res
      .status(200)
      .json({ success: true, message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
