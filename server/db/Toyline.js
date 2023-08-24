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
});

module.exports = ToyLine;
