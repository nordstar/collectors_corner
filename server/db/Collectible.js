const { INTEGER } = require("sequelize");
const conn = require("./conn");
const { STRING, UUID, UUIDV4, BOOLEAN, DECIMAL } = conn.Sequelize;

const Collectible = conn.define("collectible", {
   quantity: {
      type: INTEGER,
      validate: {
        notEmpty: true,
        min: 0,
      },
     }, 
   price_paid: {
      type: DECIMAL(10, 2),
      defaultValue: 0,
      validate: {
      notEmpty: true,
      min: 0,
      },
   },
});

module.exports = Collectible;
