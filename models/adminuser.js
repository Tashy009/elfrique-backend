"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class adminuser extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      adminuser.hasOne(models.profile);
      adminuser.hasMany(models.votingContest);
      adminuser.hasMany(models.awardContest);
      adminuser.hasMany(models.event);
    }
  }
  adminuser.init(
    {
      firstname: DataTypes.STRING,
      lastname: DataTypes.STRING,
      phonenumber: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      referral_email: DataTypes.STRING,
      email_token: {
        allowNull: true,
        type: DataTypes.STRING,
      },
      activated: {
        allowNull: true,
        type: DataTypes.TINYINT,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "adminuser",
    }
  );
  return adminuser;
};
