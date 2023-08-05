const router = require("express").Router();
const Controller = require("../controllers/controller-user");
const appRouter = require("./routers-app")

router.use("/product", appRouter);

router.get("/", Controller.readUser);
router.get("/:id", Controller.readUserByid);
router.post("/", Controller.addUser);
router.delete("/:id", Controller.deleteUser);

module.exports = router;
