const { Product, User, Category, Images, sequelize } = require('../models/index')

class Controller {
    static async readProduct(req, res, next) {
        try {
            const data = await Product.findAll({
              order: [['id', 'ASC']],
              include: [
                {
                  model: Category
                },
                {
                  model: User
                },
                {
                  model: Images
                }
              ]
            })
            res.status(200).json({
              clothes: data
            })
            // console.log(data);
          } catch (err) {
            console.log(err);
            next(err)
          }
    }

    static async detailProduct(req, res, next) {
      try {
        const { id } = req.params
        const data = await Product.findByPk(id, {
          include: [
            {
              model: Category
            },
            {
              model: User
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
}

module.exports = Controller