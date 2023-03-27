import request from "supertest";
import { app } from "../src/app";
import { signin } from "../src/test/helpers/signin";

const createTicket = () =>
  request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({ title: "title1", price: 20 });

it("it can fetch a list of tickets", async () => {
  await createTicket();
  await createTicket();
  await createTicket();

  const response = await request(app).get("/api/tickets").send().expect(200);

  expect(response.body.length).toEqual(3);
});
