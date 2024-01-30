const Category = require("./Category");
const EmailCode = require("./EmailCode");
const Image = require("./Image");
const Product = require("./Product");
const ProductCart = require("./ProductCart");
const Purchase = require("./Purchase");
const User = require("./User");

EmailCode.belongsTo(User);
User.hasOne(EmailCode);

Product.belongsTo(Category);
Category.hasMany(Product);

Image.belongsTo(Product);
Product.hasMany(Image);

Product.hasMany(ProductCart);
ProductCart.belongsTo(Product);

User.hasMany(ProductCart);
ProductCart.belongsTo(User);

Product.hasMany(Purchase);
Purchase.belongsTo(Product);

User.hasMany(Purchase);
Purchase.belongsTo(User);
