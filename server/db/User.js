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

User.prototype.createCollection = async function (body) {  
  //ak just sets 'isCollection' to false, definition of an order from a collection, (used to be createOrder from a cart)
  const collection = await this.getCollection();
  await collection.save();
  return collection;
};

//ak sets 'collection' to the user's collection
User.prototype.getCollection = async function () {
  let collection = await conn.models.collection.findOne({
    where: {
      userId: this.id,
    },
  });
  if (!collection) {    //ak if no collection made yet, then create for user
   collection = await conn.models.collection.create({
      userId: this.id,
    });
  }             //ak includes the lineitem and product info
  collection = await conn.models.collection.findByPk(collection.id, {
    include: [
      {
        model: conn.models.collectible,
        include: [conn.models.item],
      },
    ],
  });
  return collection;
};

          //ak  how to add products to collection
User.prototype.addToCollection = async function ({ item, quantity=1 }) {
  const collection = await this.getCollection();
      //ak finds corresponding collectible to add to collection
  console.log("addtoCollection collection.id", collection.id)
  let collectible = collection.collectibles.find((collectible) => {
    return collectible.itemId === item.id;
  });

  if (collectible) {   //ak if collectible exists it should add to the qty
  console.log("User.js found collectible", collectible.item.id);
    collectible.quantity += quantity;
    await collectible.save();
  } else {      //ak otherwise it creates a new one
    await conn.models.collectible.create({
      collectionId: collection.id,
      itemId: item.id,
      quantity,
    });
  }
  return this.getCollection(); //ak because we return the whole collection the structure of the state needed to change
};

User.prototype.removeFromCollection = async function ({ item, quantityToRemove }) {
  const collection = await this.getCollection();
  const collectible = collection.collectibles.find((collectible) => {
    return collectible.itemId === item.id;
  });
  collectible.quantity = collectible.quantity - quantityToRemove;
  if (collectible.quantity > 0) {
    await collectible.save();
  } else {
    await collectible.destroy();
  }
    return this.getCollection(); //ak return updated getCollection
};

User.addHook("beforeSave", async (user) => {
  if (user.changed("password")) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.findByToken = async function (token) {
  try {
    const { id } = jwt.verify(token, process.env.JWT);
    const user = await this.findByPk(id);
    if (user) {
      return user;
    }
    throw "user not found";
  } catch (ex) {
    const error = new Error("bad credentials");
    error.status = 401;
    throw error;
  }
};

// //MT: not sure why the authenticate function doesn't use this and why it's here
// //couldn't get it to work for my below method
User.prototype.generateToken = function () {
  return jwt.sign({ id: this.id }, JWT);
};

// //MT added: creates new user and returns user and token
User.encrypt = async (user) => {
  const newUser = await User.create(user);
  return jwt.sign({ id: newUser.dataValues.id }, JWT);
};

User.authenticate = async function ({ username, password }) {
  const user = await this.findOne({
    where: {
      username,
    },
  });
  if (user && (await bcrypt.compare(password, user.password))) {
    return jwt.sign({ id: user.id }, JWT);
  }
  const error = new Error("bad credentials");
  error.status = 401;
  throw error;
};

module.exports = User;
