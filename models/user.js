'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.user.hasMany(models.score)
      models.user.belongsToMany(models.skin, {through: 'userskins'})
    }
  };
  user.init({
    username:  {
      type:DataTypes.STRING, allowNull:false,
      validate: {
        notNull:true
      }
    },
    email: {
      type: DataTypes.STRING, allowNull: false,
      validate: {
        isEmail: true,
        notNull:true
      }
    },
    passsword: {
      type: DataTypes.STRING, allowNull:false,
      validate: {
        notNull: true
      }
    },
    tokens: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};