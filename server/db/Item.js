const conn = require("./conn");
const { STRING, DECIMAL, UUID, UUIDV4, BOOLEAN } = conn.Sequelize;

const Item = conn.define("item", {
//   id: {
//     type: UUID,
//     primaryKey: true,
//     defaultValue: UUIDV4,
//   },
   name: {
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
   imageUrl: {
      type: STRING,
      defaultValue:
        "https://cdn-icons-png.flaticon.com/512/1434/1434202.png",
    },
   value: {
      type: DECIMAL(10, 2),
      defaultValue: 0,
      validate: {
      notEmpty: true,
      min: 0,
      },
   },  
});

module.exports = Item;
