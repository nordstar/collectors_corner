//A user's collection
const { INTEGER } = require("sequelize");
const conn = require("./conn");
const { DATE, STRING, UUID, UUIDV4, TEXT, DECIMAL } = conn.Sequelize;

const Collection = conn.define("collection", {
//   id: {
//     type: UUID,
//     primaryKey: true,
//     defaultValue: UUIDV4,
//   },
 total_value: {
   type: DECIMAL(10, 2),
   validate: {
     notEmpty: true,
     min: 0,
   },
  },  
//   createDate: {
//    type: DATE,
//    allowNull: false,
//  },

});

module.exports = Collection;
