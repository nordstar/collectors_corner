const conn = require("./conn");
const { STRING, UUID, UUIDV4 } = conn.Sequelize;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { BOOLEAN } = require("sequelize"); //AK what is difference between this an conn.sequelize?
const JWT = process.env.JWT;

const User = conn.define("user", {
//   id: {
//     type: UUID,
//     primaryKey: true,
//     defaultValue: UUIDV4,
//   },
  username: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  password: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  email: {
    //AK added
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      isEmail: true,
    },
  },
  isAdmin: {
    //AK added
    type: BOOLEAN,
    defaultValue: false,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

// User.prototype.createOrder = async function (body) {  
//   //ak just sets 'isCart' to false, definition of an order from a cart
//   const cart = await this.getCart();
//   console.log("cart from createOrder after GetCart, and body", cart.orderTotal, body?.orderTotal)
//   cart.isCart = false;
//   cart.orderTotal = body?.orderTotal;
//   await cart.save();
//   return cart;
// };

// //ak sets 'cart' to the user's cart
// User.prototype.getCart = async function () {
//   let cart = await conn.models.order.findOne({
//     where: {
//       userId: this.id,
//       isCart: true,
//     },
//   });
//   //lets delay to allow cart to be found
//   if (!cart) {    //ak if no cart made yet, then create for user
//     cart = await conn.models.order.create({
//       userId: this.id,
//     });
//   }             //ak includes the lineitem and product info

//   cart = await conn.models.order.findByPk(cart.id, {
//     include: [
//       {
//         model: conn.models.lineItem,
//         include: [conn.models.product],
//       },
//     ],
//   });
//   return cart;
// };
//           //ak  how to add products to cart
// User.prototype.addToCart = async function ({ product, quantity }) {
//   const cart = await this.getCart();
//       //ak finds corresponding lineitem to add to cart
//   let lineItem = cart.lineItems.find((lineItem) => {
//     return lineItem.productId === product.id;
//   });

//   if (lineItem) {   //ak if lineItem exists it should add to the qty, this IS working, just not displaying right due to state
//       lineItem.quantity += quantity;
//     await lineItem.save();
//   } else {      //ak otherwise it creates a new one
//     await conn.models.lineItem.create({
//       orderId: cart.id,
//       productId: product.id,
//       quantity,
//     });
//   }
//   return this.getCart(); //ak because we return the whole cart the structure of the state needed to change
// };

// User.prototype.removeFromCart = async function ({ product, quantityToRemove }) {
//   const cart = await this.getCart();
//   const lineItem = cart.lineItems.find((lineItem) => {
//     return lineItem.productId === product.id;
//   });
//   lineItem.quantity = lineItem.quantity - quantityToRemove;
//   if (lineItem.quantity > 0) {
//     await lineItem.save();
//   } else {
//     await lineItem.destroy();
//   }
//     return this.getCart(); //ak return updated cart
// };

// User.addHook("beforeSave", async (user) => {
//   if (user.changed("password")) {
//     user.password = await bcrypt.hash(user.password, 5);
//   }
// });

// User.findByToken = async function (token) {
//   try {
//     const { id } = jwt.verify(token, process.env.JWT);
//     const user = await this.findByPk(id);
//     if (user) {
//       return user;
//     }
//     throw "user not found";
//   } catch (ex) {
//     const error = new Error("bad credentials");
//     error.status = 401;
//     throw error;
//   }
// };

// //MT: not sure why the authenticate function doesn't use this and why it's here
// //couldn't get it to work for my below method
// User.prototype.generateToken = function () {
//   return jwt.sign({ id: this.id }, JWT);
// };

// //MT added: creates new user and returns user and token
// User.encrypt = async (user) => {
//   const newUser = await User.create(user);
//   return jwt.sign({ id: newUser.dataValues.id }, JWT);
// };

// User.authenticate = async function ({ username, password }) {
//   const user = await this.findOne({
//     where: {
//       username,
//     },
//   });
//   if (user && (await bcrypt.compare(password, user.password))) {
//     return jwt.sign({ id: user.id }, JWT);
//   }
//   const error = new Error("bad credentials");
//   error.status = 401;
//   throw error;
// };

module.exports = User;
