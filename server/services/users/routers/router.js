const express = require("express");
const router = express.Router();
const { findAllUsers, createUser, findUserById, deleteUserById } = require("../controllers/controller");

router.get("/", findAllUsers);
router.get("/:id", findUserById);
router.post("/", createUser);
router.delete("/:id", deleteUserById);


module.exports = router;