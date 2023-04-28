import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";
import { signin } from "../../test/helpers/signin";

it("returns an error if the ticket does not exist", async () => {
  const ticketId = new mongoose.Types.ObjectId();

  await request(app)
    .post("/api/orders")
    .set("Cookie", signin())
    .send({ ticketId })
    .expect(404);
});

it("returns an error if the ticket is already reserved", async () => {});
it("reserves a ticket", async () => {});
