import request from "supertest";
import { app } from "../../app";

it("responds with details about current user", async () => {
  const authResponse = await request(app)
    .post("/api/users/signup")
    .send({
      email: "test@test.com",
      password: "password",
    })
    .expect(201);

  const response = await request(app)
    .get("/api/user/currentUser")
    .send()
    .expect(200);

  console.log(response.body);
});
