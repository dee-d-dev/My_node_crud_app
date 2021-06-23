const express = require("express");
const router = express.Router();
const services = require("../services/render");
const controller = require("../controller/controller");

//route

//home route
router.get("/", services.homeRoute);

//home route
router.get("/add-user", services.add_user);

//home route METHOD UPDATE
router.get("/update-user", services.update_user);

//API

//add user
router.post("/api/users", controller.create);

//find user
router.get("/api/users", controller.find);

//update user
router.put("/api/users/:id", controller.update);

//delete user
router.delete("/api/users/:id", controller.delete);

module.exports = router;
