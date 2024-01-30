const request = require("supertest");
const app = require("../app");
require("../models");

let id;
let token;

beforeAll(async () => {
  const credentials = {
    email: "nelsonkennedy2004@gmail.com",
    password: "nelson1234",
  };

  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
});

test("GET /products consulta todos los productos", async () => {
  const res = await request(app).get("/products");
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
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.title).toBe(product.title);
});

test("UPDATE /products/:id debe actualizar una categoria", async () => {
  const productUpdate = {
    title: "product actualizada test",
  };
  const res = await request(app)
    .put(`/products/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send(productUpdate);
  expect(res.status).toBe(200);
  expect(res.body.title).toBe(productUpdate.title);
});

test("DELETE /categories/:id debe eliminar una categoria", async () => {
  const res = await request(app)
    .delete(`/products/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
