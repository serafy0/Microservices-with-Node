import request from "supertest";

import { app } from "../../app";

it("clears the cookie after signing out", async () => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "passwrd" })
    .expect(201);

  await request("api/user/signout")
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "passwrd" })
    .expect(400);

  const response = await request(app)
    .post("/api/users/signout")
    .send({})
    .expect(200);

  console.log(response.get("Set-Cookie"));
}, 7999);
