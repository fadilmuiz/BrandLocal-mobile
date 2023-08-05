const { Product, Category, Images, sequelize } = require('../models/index')
const { generateToken } = require('../helpers/jwt')
const bcrypt = require('bcrypt')

class Controller {

  static async readClothes(req, res, next) {
    try {
      const data = await Product.findAll({
        order: [['id', 'DESC']],
        include: [
          {
            model: Category
          }
        ]
      })
      res.status(200).json(data)
      // console.log(data);
    } catch (err) {
      console.log(err);
      next(err)
    }
  }

  static async readCategory(req, res, next) {
    try {
      const data = await Category.findAll({})
      res.status(200).json(data)
    } catch (err) {
      console.log(err);
    }
  }

  static async clothesDetail(req, res, next) {
    try {
      const { id } = req.params
      const data = await Product.findByPk(id, {
        include: [
          {
            model: Category
          },
          {
            model: Images
          }
        ]
      })
      if (!data) {
        throw {
          name: "Not Found"
        }
      }
      res.status(200).json(data)
    } catch (err) {
      console.log(err);
    }
  }

  static async categoryDetail(req, res, next) {
    try {
      const { id } = req.params
      const data = await Category.findByPk(id)
      res.status(200).json(data)
    } catch (err) {
      console.log(err);
    }
  }

  static async imageDetail(req, res, next) {
    try {
      const { id } = req.params
      const data = await Images.findOne({ where: { productId: id } })
      res.status(200).json(data)
    } catch (err) {
      console.log(err);
    }
  }

  static async addProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name, description, price, mainImg, categoryId } = req.body
      console.log(req.body,"VVVVVVVVVVVVVVVVVVVVVVV");
      // const { userId } = req.additionalData
      let slug;
      if (name) {
        slug = name.split(/\s+/).join("-") + "-"
      }
      const createProduct = await Product.create({ name, slug, description, price, mainImg, categoryId, authorId: 1 }, { t })

      // const createImage = await Images.create({ productId: createProduct.id, imgUrl1, imgUrl2, imgUrl3 }, { t })

      res.status(201).json(createProduct)
      res.status(201).json(createImage)
      await t.commit()
    } catch (err) {
      console.log(err);
      await t.rollback();
    }
  }

  static async editProduct(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params
      const { name, description, price, mainImg, categoryId, imgUrl1, imgUrl2, imgUrl3 } = req.body
      console.log(req.body);
      let slug;
      if (name) {
        slug = name.split(/\s+/).join("-") + "-"
      }
      const data = await Product.update({ name, slug, description, price, mainImg, categoryId }, {
        where: { id: id },
        returning: true
      }, { t })

      const data2 = await Images.update({ imgUrl1, imgUrl2, imgUrl3 }, {
        where: { productId: id }
      }, { t })

      if (!data) throw { name: "Not Found" }
      res.status(201).json({
        message: data
      })
      res.status(201).json(createImage)
      await t.commit()
    } catch (err) {
      console.log(err);
      await t.rollback();
      next(err)
    }
  }

  static async addCategory(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { name } = req.body
      const data = await Category.create({ name }, { t })
      res.status(201).json(data)
      await t.commit()
    } catch (err) {
      console.log(err);
      await t.rollback();
    }
  }

  static async editCategory(req, res, next) {
    const t = await sequelize.transaction();
    try {
      const { id } = req.params
      const { name } = req.body
      const data = await Category.update({ name }, {
        where: { id: id },
        returning: true
      }, { t })
      res.status(201).json(data)
      await t.commit()
    } catch (err) {
      console.log(err);
      await t.rollback();
    }
  }

  static async deleteProduct(req, res, next) {
    try {
      const { id } = req.params
      const findProduct = await Product.findByPk(id);

      if (!findProduct) throw { name: "Not Found" };

      const destroy = await Product.destroy({
        where: { id },
      });
      const destroyImage = await Images.destroy({ where: { productId: id } })
      res.status(200).json({
        message: `Product with id ${id} has been deleted`,
      });
    } catch (error) {
      next(error);
    }
  }

  static async deleteCategory(req, res, next) {
    try {
      const { id } = req.params
      const findCategory = await Category.findByPk(id);

      if (!findCategory) throw { name: "Not Found" };

      const destroy = await Category.destroy({
        where: { id },
      });
      if (destroy) {
        const destroyProduct = await Product.destroy({ where: { categoryId: id } })
      }
      res.status(200).json({
        message: `Category with id ${id} has been deleted`,
      });
    } catch (err) {
      console.log(err);
    }
  }
}


module.exports = Controller