const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
const bodyParser = require("body-parser");
const posts = {};

app.use(bodyParser.json());
app.use(cors());

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/posts/create", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  try {
    await axios.post("http://event-bus-srv:4005/events", {
      type: "PostCreated",
      data: { id, title },
    });
  } catch (err) {
    console.log({ err });
    return res.status(400).json({ err: err.message });
  }

  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log("Recived Event", req.body.type);

  res.send({});
});

app.listen(4000, () => {
  console.log("v55");
  console.log("listening on 4000");
});
