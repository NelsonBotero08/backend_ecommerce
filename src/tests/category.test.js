const request = require("supertest");
const app = require("../app");

let id;
let token;

beforeAll(async () => {
  const credentials = {
    email: "nelsonkennedy2004@gmail.com",
    password: "valery",
  };

  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
});

test("GET /categories debe consultar todas las categorias", async () => {
  const res = await request(app).get("/categories");
  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("POST /categories debe crear una categoria", async () => {
  const category = {
    name: "categori test",
  };
  const res = await request(app)
    .post("/categories")
    .set("Authorization", `Bearer ${token}`)
    .send(category);
  id = res.body.id;
  expect(res.status).toBe(201);
  expect(res.body.id).toBeDefined();
  expect(res.body.name).toBe(category.name);
});

test("UPDATE /categories/:id debe actualizar una categoria", async () => {
  const categoryUpdate = {
    name: "categori actualizada test",
  };
  const res = await request(app)
    .put(`/categories/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send(categoryUpdate);
  expect(res.status).toBe(200);
  expect(res.body.name).toBe(categoryUpdate.name);
});

test("DELETE /categories/:id debe eliminar una categoria", async () => {
  const res = await request(app)
    .delete(`/categories/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
