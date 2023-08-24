const conn = require("./conn");
const { STRING, DECIMAL, UUID, UUIDV4, BOOLEAN } = conn.Sequelize;

const Item = conn.define("item", {
//   id: {
//     type: UUID,
//     primaryKey: true,
//     defaultValue: UUIDV4,
//   },
   Name: {
      type: STRING,
      allowNull: false,
      validate: {
         notEmpty: true,
      },
      },
   description: {
      type: STRING,
      allowNull: false,
      validate: {
      notEmpty: true,
      },
   },
   value: {
      type: DECIMAL(10, 2),
      validate: {
      notEmpty: true,
      min: 0,
      },
   },  
});

module.exports = Item;
