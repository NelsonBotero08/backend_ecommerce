const request = require("supertest");
const app = require("../app");
const User = require("../models/User");
const EmailCode = require("../models/EmailCode");

let id;
let token;

test("POST /users debe crear un usuario", async () => {
  const user = {
    firstName: "santiago",
    lastName: "Botero",
    email: "test@gmail.com",
    password: "test1234",
    phone: "3196675150",
  };
  const res = await request(app).post("/users").send(user);
  id = res.body.result.id;
  await User.update({ isVerified: true }, { where: { email: user.email } });
  await EmailCode.destroy({ where: { userId: null } });
  expect(res.status).toBe(201);
  expect(res.body.result.id).toBeDefined();
  expect(res.body.result.firstName).toBe(user.firstName);
});

test("POST /users/login se realiza login de usuario y se crea token", async () => {
  const credentials = {
    email: "test@gmail.com",
    password: "test1234",
  };

  const res = await request(app).post("/users/login").send(credentials);
  token = res.body.token;
  expect(res.status).toBe(201);
  expect(res.body.user.email).toBe(credentials.email);
  expect(res.body.token).toBeDefined();
});

test("GET /users debe retornar todos los usuarios", async () => {
  const res = await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${token}`);

  expect(res.status).toBe(200);
  expect(res.body).toBeInstanceOf(Array);
});

test("UPDATE /users/:id debe actualizar un usuario", async () => {
  const user = {
    firstName: "Nelson actualizado",
  };
  const res = await request(app)
    .put(`/users/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send(user);
  expect(res.status).toBe(200);
  expect(res.body.firstName).toBe(user.firstName);
});

test("DELETE /users/:id debe eliminar un usuario", async () => {
  const res = await request(app)
    .delete(`/users/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(res.status).toBe(204);
});
