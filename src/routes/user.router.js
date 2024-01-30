const {
  getAll,
  create,
  getOne,
  remove,
  update,
  login,
  getVerifyCode,
  resetPassword,
  updatePasswordUser,
} = require("../controllers/user.controllers");
const express = require("express");
const verifyJWT = require("../utils/verifyJWT");

const userRouter = express.Router();

userRouter.route("/users").get(verifyJWT, getAll).post(create);

userRouter.route("/users/login").post(login);

userRouter.route("/users/reset_password").post(resetPassword);

userRouter.route("/users/:id").delete(verifyJWT, remove).put(verifyJWT, update);

userRouter.route("/users/verify/:code").get(getVerifyCode);

userRouter.route("/users/reset_password/:code").post(updatePasswordUser);

module.exports = userRouter;
