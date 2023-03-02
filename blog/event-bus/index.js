const express = require("express");

const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();

app.use(bodyParser.json());

const events = [];

app.post("/events", async (req, res) => {
  const event = req.body;
  events.push(event);
  console.log("ended");
  const posts = axios.post("http://posts-clusterip-srv:4000/events", event);
  const comments = axios.post("http://comments-srv:4001/events", event);
  const query = axios.post("http://query-srv:4002/events", event);
  const moderation = axios.post("http://moderation-srv:4003/events", event);
  try {
    await Promise.all([posts, comments, query, moderation]);
  } catch (err) {
    res.send.json({ err: err.message });
    console.log(err.message);
  }
  console.log("ended");
  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});
app.listen(4005, () => {
  console.log("listening on 4005");
});
