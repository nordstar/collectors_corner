const conn = require("./conn");
const User = require("./User");
const Collection = require("./Collection");
const Collectible = require("./Collectible");
const Category = require("./Category");
const ToyLine = require("./Toyline");
const Item = require("./Item");



User.hasMany(Collection);
Collection.belongsTo(User);

Collection.hasMany(Collectible);
Collectible.belongsTo(Collection);


Item.hasMany(Collectible);
Collectible.belongsTo(Item);
//intermediate table for many to many

ToyLine.hasMany(Item);
Item.belongsTo(ToyLine);


ToyLine.belongsTo(Category);
Category.hasMany(ToyLine);


const syncAndSeed = async () => {
  await conn.sync({ force: true }); //forces rebuild of DB

  const [moe, lucy, alan, heman, orko, skeletor, leo, don, raph, mike, EightiesToys, MOTU, TMNT] = await Promise.all([
    User.create({username: "moe",password: "123",email: "moe@aol.com"}),
    User.create({ username: "lucy", password: "123", email: "lucy@aol.com" }),
    User.create({ username: "alan", password: "123", email: "alan@aol.com", isAdmin: true }),
    Item.create({ name: "He-man", description: "The strongest man in the universe!  Prince Adam's alter ego, by the power of grayskull he has the POWER!", imageUrl: "../../static/images/heman.png",  }),
    Item.create({ name: "Orko", description: "What exactly is orko?  Is he a ghost?  some sort of magic creature?  No one really knows.", imageUrl: "../../static/images/orko.png", }),
    Item.create({ name: "Skeletor", description: "After a science experiment left him horribly disfigured, Skeletor aims to gain ultimate power.", imageUrl: "../../static/images/skeletor.png",  }),
    Item.create({ name: "Leonardo", description: "The leader of the ninja turtles, he likes swords, and the color blue", imageUrl: "../../static/images/tmnt_leonardo.png",  }),
    Item.create({ name: "Donatello", description: "He's the intellectual of the bunch, he likes the big stick weapon", imageUrl: "../../static/images/tmnt_donatello.png",  }),
    Item.create({ name: "Raphael", description: "His weapon doesn't seem as effective as the others, its supposed to be used to break swords", imageUrl: "../../static/images/tmnt_raphael.png",  }),
    Item.create({ name: "Michelangelo", description: "This one was always supposed to be the fun one, he likes orange or yellow.", imageUrl: "../../static/images/tmnt_mike.png",  }),
    Category.create({ name: "80's Toys", description: "The Golden Age of toys"}),
    ToyLine.create({ name: "Masters of the Universe", description: "Based on the Mattel hit toyline", production_year: 1983}),
    ToyLine.create({ name: "Teenage Mutant Ninja Turtles", description: "Based on the Mattel smash hit toyline", production_year: 1983}),
    
  ]);


  const collection = await alan.getCollection();
  await alan.addToCollection({ item: heman, quantity: 1, price_paid: 19.95});
  await alan.addToCollection({ item: skeletor, quantity: 1,price_paid: 13.95 });
  await alan.addToCollection({ item: orko, quantity: 1, price_paid: 16.95});
  
  
  return {
    users: {
      moe,
      lucy,
      alan,
    },
    items: {
      heman,
      orko,
      skeletor,
      leo,
      don,
      raph,
      mike
    },
    category: {
      EightiesToys
    },
    toyLine:{
      MOTU, TMNT
    }
  };
};

module.exports = {
  syncAndSeed,
  User,
  Collectible,
  Collection,
  Item,
  Category,
  ToyLine
};
