import mongoose from "mongoose";
import request from "supertest";
import { app } from "../src/app";
import { signin } from "../src/test/helpers/signin";

it("return a 404 if the provided id does not exist", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put("/api/tickets/" + id)
    .set("Cookie", signin())
    .send({
      title: "asdasd",
      price: 20,
    })
    .expect(404);
});

it("returns a 401 if th user does not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put("/api/tickets/" + id)
    .send({
      title: "asdasd",
      price: 20,
    })
    .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({
      title: "dasda",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", signin())
    .send({ title: "dsada", price: 322 })
    .expect(401);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
  const cookie = signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "dasda",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 20 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "dsadsa", price: -20 })
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  const cookie = signin();

  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({
      title: "dasda",
      price: 20,
    });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "new title", price: 50 })
    .expect(200);

  const ticketResponse = await request(app).get(
    `/api/tickets/${response.body.id}`
  );
  expect(ticketResponse.body.title).toEqual("new title");
  expect(ticketResponse.body.price).toEqual(50);
});
