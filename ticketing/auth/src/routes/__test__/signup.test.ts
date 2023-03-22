import request from "supertest";

import { app } from "../../app";

it("returns a 201 on succe(ssful signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);
});

it("returns a 400 with an invalid email", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "invalidemail",
      password: "password",
    })
    .expect(400);
});

it("returns a 400 with an invalid password", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "test@tes.com",
      password: "p",
    })
    .expect(400);
});

it("returns a 400 with a missing email or password", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "tes@tes.com" })
    .expect(400);
  await request(app)
    .post("/api/users/signup")
    .send({ password: "newpassword" })
    .expect(400);
});

it("returns a 400 for duplicate emails", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "passwrd" })
    .expect(201);

  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "passwrd" })
    .expect(400);
});
