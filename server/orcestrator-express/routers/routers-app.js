const router = require("express").Router();
const controllerProduct = require("../controllers/controller-app")

router.get("/clothes" , controllerProduct.readProduct)
router.post("clothes", controllerProduct.addProduct)
router.get("/clothes/:id" , controllerProduct.detailProduct)
router.put("clothes/:id", controllerProduct.editProduct);
router.delete("clothes/:id", controllerProduct.deleteProduct)

module.exports = router;
