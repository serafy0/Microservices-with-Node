import request from "supertest";
import { app } from "../../app";
import { signin } from "../../test/helpers/signin";

it("responds with details about current user", async () => {
  const cookie = await signin();
  const response = await request(app)
    .get("/api/users/currentUser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(response.body.currentUser.email).toEqual("test@test.com");
});
