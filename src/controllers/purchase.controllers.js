const catchError = require("../utils/catchError");
const Purchase = require("../models/Purchase");
const ProductCart = require("../models/ProductCart");
const Product = require("../models/Product");
const Image = require("../models/Image");

const getAll = catchError(async (req, res) => {
  const result = await Purchase.findAll({
    where: { userId: req.user.id },
    include: [
      {
        model: Product,
        include: [Image],
      },
    ],
  });
  if (!result) return res.status(404).json({ message: "User not login" });
  return res.json(result);
});

const create = catchError(async (req, res) => {
  const productPurchases = await ProductCart.findAll({
    where: { userId: req.user.id },
  });
  productPurchases.map(async (prod) => {
    await Purchase.create({
      quantity: prod.quantity,
      productId: prod.productId,
      userId: prod.userId,
    });
    await ProductCart.destroy({ where: { id: prod.id } });
  });
  return res.status(201).json({ message: "compra realizada con exito" });
});

module.exports = {
  getAll,
  create,
};
