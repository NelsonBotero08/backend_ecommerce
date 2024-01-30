const request = require("supertest");
const app = require("../app");
require("../models");

let token;
let userId;
let productId;
let id;

beforeAll(async () => {
  const credentials = {
    email: "nelsonkennedy2004@gmail.com",
    password: "nelson1234",
  };
  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
  userId = res.body.user.id;
});

test("GET /productsCarts debe traer todos los productos", async () => {
  const res = await request(app)
    .get("/productCarts")
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /products crear un producto", async () => {
  const product = {
    title: "Samsung A03",
    description: "gshsgfdfdncnnv jdhgdhdfkfhfe jdkgdfkhgfkhkgf jhfkhf",
    brand: "Samsung",
    price: "500000",
  };
  const res = await request(app)
    .post("/products")
    .send(product)
    .set("Authorization", `Bearer ${token}`);
  productId = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.title).toBe(product.title);
});

test("POST /productsCarts debre ingresar productos al cart", async () => {
  const productcart = {
    userId: userId,
    productId: productId,
    quantity: 1,
  };
  const res = await request(app)
    .post("/productCarts")
    .set("Authorization", `Bearer ${token}`)
    .send(productcart);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.quantity).toBe(productcart.quantity);
});

test("UPDATE /productCarts/:id debe actualizar un producto", async () => {
  const productcart = {
    quantity: 2,
  };
  const res = await request(app)
    .put(`/productCarts/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send(productcart);
  expect(res.status).toBe(200);
  expect(res.body.quantity).toBe(productcart.quantity);
});

test("DELETE /productCarts/:id debe eliminar un producto del carrito", async () => {
  const res = await request(app)
    .delete(`/productCarts/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});

test("DELETE /categories/:id debe eliminar una categoria", async () => {
  const res = await request(app)
    .delete(`/products/${productId}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
