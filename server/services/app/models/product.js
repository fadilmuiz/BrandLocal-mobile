'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Category, {foreignKey: "categoryId"})
      this.hasMany(models.Images, {foreignKey: "productId"})
      // this.belongsTo(models.User, {foreignKey:"authorId"})
    }
  }
  Product.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false
    },
    slug: DataTypes.STRING,
    description: {
      type:DataTypes.STRING,
      allowNull:false
    },
    price:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    mainImg: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};