const conn = require("./conn");
const User = require("./User");
const Collection = require("./Collection");
const Collectible = require("./Collectible");
const Category = require("./Category");
const ToyLine = require("./Toyline");
const Item = require("./Item");



Collection.belongsTo(User);

Collection.hasMany(Collectible);
Collectible.belongsTo(Collection);

ToyLine.belongsTo(Category);
Category.hasMany(ToyLine);

Item.belongsTo(ToyLine);
ToyLine.hasMany(Item);

Item.belongsTo(Collectible);



const syncAndSeed = async () => {
  await conn.sync({ force: true });
  const [moe, lucy, alan, foo, bar, bazz, ethyl] = await Promise.all([
    User.create({
      username: "moe",password: "123",email: "moe@aol.com",
      isAdmin: false,
    }),
    User.create({ username: "lucy", password: "123", email: "lucy@aol.com" }),
    User.create({ username: "alan", password: "123", email: "alan@aol.com" }),
    Product.create({ name: "foo", price: 3.5 }),
    Product.create({ name: "bar", price: 1 }),
    Product.create({ name: "bazz", price: 10 }),
    User.create({ username: "ethyl", password: "123", email: "ethyl@aol.com" }),
  ]);
  const boise = await Promise.all([
    Address.create({
      firstName: "Tammy",
      lastName: "Wynett",
      streetAddress: "10 Black Lane",
      city: "Boise",
      state: "Idaho",
      zipCode: "83701",
      phone: "917-349-0579",
      userId: moe.id,
    }), //MT
  ]);

  const cart = await ethyl.getCart();
  await ethyl.addToCart({ product: bazz, quantity: 3 });
  await ethyl.addToCart({ product: foo, quantity: 2 });
  return {
    users: {
      moe,
      lucy,
      alan,
    },
    products: {
      foo,
      bar,
      bazz,
    },
    addresses: {
      boise, //MT
    },
  };
};

module.exports = {
  syncAndSeed,
  User,
  Product,
  Review,
  Address,
};
