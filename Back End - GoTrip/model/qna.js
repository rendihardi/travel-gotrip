// models/qna.js
const { DataTypes } = require("sequelize");
const db = require("../db/index.js");

const qna = db.sequelize.define(
  "qna",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "qna",
  }
);

module.exports = qna;
