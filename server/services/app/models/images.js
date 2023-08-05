'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Images extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product, {foreignKey: "productId"})
    }
  }
  Images.init({
    productId: DataTypes.INTEGER,
    imgUrl1: DataTypes.STRING,
    imgUrl2: DataTypes.STRING,
    imgUrl3: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Images',
  });
  return Images;
};