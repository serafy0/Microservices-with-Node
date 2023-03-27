import request from "supertest";
import { app } from "../src/app";
import { signin } from "../src/test/helpers/signin";

it("returns a 404 if the ticket is not found", async () => {
  await request(app).get("/api/tickets/fake-looking-id").send().expect(404);
});

it("returns the ticket if the ticlet is found", async () => {
  const title = "new title";
  const price = 20;

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({ title, price })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/app/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.title).toEqual(price);
});
