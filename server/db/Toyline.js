//A toyline ie Transformers or Heman
const { INTEGER } = require("sequelize");
const conn = require("./conn");
const { DATE, STRING, UUID, UUIDV4, TEXT, DECIMAL } = conn.Sequelize;

const ToyLine = conn.define("toyLine", {
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
 production_year: {
   type: INTEGER,
 },
 imageUrl: {
   type: STRING,
   defaultValue:
     "https://cdn-icons-png.flaticon.com/512/1434/1434202.png",
 },
});

module.exports = ToyLine;
