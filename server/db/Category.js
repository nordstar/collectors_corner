const conn = require("./conn");
const { STRING, UUID, UUIDV4, BOOLEAN } = conn.Sequelize;

const Category = conn.define("category", {
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

});

module.exports = Category;
