import express from "express";
import { body } from "express-validator";
import { Request, Response } from "express";
import { validateRequest } from "../middlewares/validate-request";
const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("you must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    res.send({});
  }
);

export { router as signinRouter };
