const {
  getAll,
  create,
  remove,
  update,
} = require("../controllers/productCart.constrollers");
const express = require("express");
const verifyJWT = require("../utils/verifyJWT");

const productCartRouter = express.Router();

productCartRouter
  .route("/productCarts")
  .get(verifyJWT, getAll)
  .post(verifyJWT, create);

productCartRouter
  .route("/productCarts/:id")
  .delete(verifyJWT, remove)
  .put(verifyJWT, update);

module.exports = productCartRouter;
