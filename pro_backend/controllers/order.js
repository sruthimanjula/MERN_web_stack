const { Order, ProductCart } = require("../models/order");
const nodemailer = require("nodemailer");

exports.getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "NO order found in DB",
        });
      }
      req.order = order;
      next();
    });
};

exports.createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  order.save((err, order) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to save your order in DB",
      });
    }
    console.log(order);
    let transporter = nodemailer.createTransport({
      service: "gmail.com",
      secure: false,
      auth: {
        user: "sruthi.testemail2@gmail.com",
        pass: "12345test2",
      },
      tls: {
        rejectUnauthorized: false,
      },
    
    });
    
    
    let mailOptions = {
      from: "sruthi.testemail2@gmail.com",
      to: "sruthi.testemail@gmail.com",
      subject: "biba fashion capital",
      text: "shipped",
    };
    
    transporter.sendMail(mailOptions, function (err, data) {
      if (err) {
        console.log("Error:", err);
      } else {
        console.log("Email sent!!!");
      }
    });
    
    res.json(order);
  });
};

exports.getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No orders found in DB",
        });
      }
      console.log("I M Called");
      res.json(order);
    });
};

exports.getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

exports.updateStatus = (req, res) => {
  Order.update(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, order) => {
      if (err) {
        return res.status(400).json({
          error: "Cannot update order status",
        });
      }
      res.json(order);
    }
  );
};
