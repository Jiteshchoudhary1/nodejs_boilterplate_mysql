const express = require("express");
const validator = require("express-joi-validation").createValidator({});
const router = express.Router();
const { validation } = require("../validation");
const { controllers } = require("../controller");
const { authMiddleware } = require("../middleware/authJwtVerify");
const { userValidation } = validation;
const { userController } = controllers;

router.post(
    "/",
    validator.body(userValidation.createUser),
    userController.create
);

router.post(
    "/login",
    validator.body(userValidation.login),
    userController.login
);


router.get(
    "/",
    userController.findAll
);


router.get(
    "/list",
    authMiddleware,
    userController.findAll
);


router.put(
    "/:_id",
    userController.update
);
module.exports = router;
