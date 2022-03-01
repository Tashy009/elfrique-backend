"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class trivia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  trivia.init(
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      image: DataTypes.STRING,
      details: DataTypes.TEXT,
      instruction: DataTypes.TEXT,
      duration: DataTypes.STRING,
      type: DataTypes.ENUM("once", "unliimited"),
    },
    {
      sequelize,
      modelName: "trivia",
    }
  );
  return trivia;
};
