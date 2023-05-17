import { app } from "../../app";
import request from "supertest";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const signin = (id?: string): string[] => {
  //Build a JWT payload. {id, email}

  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: "test@test1.com",
  };
  //Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  //Build session Object
  const session = { jwt: token };
  //Turn that session into JSON
  const sessionJSON = JSON.stringify(session);
  //Take JSON and enconde it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");
  //return a string thats the cookie with the encoded data
  return [`session=${base64}`];
};

export { signin };
