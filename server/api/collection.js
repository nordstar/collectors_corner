const express = require("express");
const app = express.Router();
const { User } = require("../db");
const Collection = require("../db/Collection");

module.exports = app;

//get collection?  originally checking out
// app.post("/", async (req, res, next) => {
//   try {

//     const user = await User.findByToken(req.headers.authorization);   //ak not familiar with this
//     res.send(await user.createCollection());
//   } catch (ex) {
//     next(ex);
//   }
// });

//getting the collection view /api/collection
app.get("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.getCollection());
  } catch (ex) {
    next(ex);
  }
});

//adding to collection   /api/collection
app.post("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    //AK guest checkout?
    console.log("api/collection.js app.post to collection ")
    res.send(await user.addToCollection(req.body)); //ak request.body is the product object
  } catch (ex) {
    next(ex);
  }
});

//removing from collection  /api/collection
app.put("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.removeFromCollection(req.body));
  } catch (ex) {
    next(ex);
  }
});

// //GET /api/orders/user/:id  grab all orders for specific user
// app.get("/user/:id", async (req, res, next) => {
//   try {
//     const user = await User.findByToken(req.headers.authorization);
//     if (user.id === req.params.id) {
//       const orders = await Order.findAll({
//         where: { userId: user.id, isCollection: false },
//         include: { all: true, nested: true },
//       });
//       res.send(orders);
//     }
//   } catch (ex) {
//     res
//       .status(404)
//       .json({ message: "cannot locate any orders for that user", ex });
//     next(ex);
//   }
// });
