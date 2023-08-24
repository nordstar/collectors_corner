const conn = require("./conn");
const { STRING, UUID, UUIDV4, BOOLEAN, DECIMAL } = conn.Sequelize;

const Collectible = conn.define("collectible", {
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
   Notes: {
      type: STRING
   },
//    obtainDate: {
//       type: DATE,
//       allowNull: false,
//  },
   value: {
      type: DECIMAL(10, 2),
      validate: {
      notEmpty: true,
      min: 0,
      },
   },  
});

module.exports = Collectible;
