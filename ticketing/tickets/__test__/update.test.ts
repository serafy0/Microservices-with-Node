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

it("returns a 401 if the user does not own the ticket", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put("/api/tickets/" + id)
    .send({
      title: "asdasd",
      price: 20,
    })
    .expect(401);
});

it("returns a 401 if th user does not authenticated", async () => {});

it("returns a 400 if the user provides an invalid title or price", async () => {});

it("updates the ticket provided valid inputs", async () => {});
