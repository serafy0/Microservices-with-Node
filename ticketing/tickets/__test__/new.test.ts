import request from "supertest";
import { app } from "../src/app";
import { signin } from "../src/test/helpers/signin";

it("has a route handler listening to /api/tickets for post requests", async () => {
  const response = await request(app).post("/api/tickets").send({});

  expect(response.status).not.toEqual(404);
});

it("can only be accessed if user is signed in", async () => {
  const response = await request(app).post("/api/tickets").send({}).expect(401);
});

it("returns a status other than 401 if the user is signed in", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({});
  expect(response.status).not.toEqual(401);
});

it("it returns an error if invalid title is provided", async () => {});

it("it return an error if invalid price is provided", async () => {});

it("creates a ticket with valid inputs", async () => {});
