import mongoose from "mongoose";
import { signin } from "../../test/helpers/signin";
import request from "supertest";
import { app } from "../../app";
import { OrderStatus } from "@ticketing-s/common";
import { Order } from "../../models/order";

it("return a 404 when purchasing an order that does not exist", async () => {
  await request(app)
    .post("/api/payments")
    .set("Cookie", signin())
    .send({
      token: "randomToken",
      orderId: new mongoose.Types.ObjectId().toHexString(),
    })
    .expect(404);
});

it("return a 401 when purchasing an order that does not belong to the user", async () => {
  const order = Order.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    userId: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    price: 20,
    status: OrderStatus.Created,
  });
  await order.save();

  await request(app)
    .post("/api/payments")
    .set("Cookie", signin())
    .send({
      token: "randomToken",
      orderId: order.id,
    })
    .expect(401);
});
it("return a 404 when purchasing a cancelled order", async () => {});
