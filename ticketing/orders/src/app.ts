import express, { NextFunction } from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieSession from "cookie-session";
import { errorHandler, NotFoundError, currentUser } from "@ticketing-s/common";

import { newOrderRouter } from "./routes/new";
import { showorderRouter } from "./routes/show";
import { IndexOrderRouter } from "./routes";
import { deleteOrderRouter } from "./routes/delete";

const app = express();
//trust traffic from proxy
app.set("trust proxy", true);

app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUser);

app.use(deleteOrderRouter);
app.use(IndexOrderRouter);
app.use(newOrderRouter);
app.use(showorderRouter);

app.all("*", async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
