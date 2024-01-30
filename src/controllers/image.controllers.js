const catchError = require("../utils/catchError");
const Image = require("../models/Image");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../utils/cloudinary");

const getAll = catchError(async (req, res) => {
  const result = await Image.findAll();
  return res.json(result);
});

const create = catchError(async (req, res) => {
  const file = req.file;
  const { url } = await uploadToCloudinary(file);
  const { productId } = req.body;
  const image = await Image.create({
    url,
    productId,
  });
  return res.json(image);
});

const remove = catchError(async (req, res) => {
  const { id } = req.params;
  const image = await Image.findByPk(id);
  if (!image) return res.status(404).send("images not found");

  await deleteFromCloudinary(image.url);
  await image.destroy();

  return res.sendStatus(204);
});

module.exports = {
  getAll,
  create,
  remove,
};
