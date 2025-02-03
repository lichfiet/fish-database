// to do:
//// - database connectoion
//// - create a health check
//
//   - add a way to get all fish
//   - add a way to delete a fish
//   - add a way to edit a fish
//   - add a way to add a fish
//   - add a way to get a fish
//   - containerize
//   - add tests
//   - add validation middleware
//   - env vars
const { default: axios } = require("axios");
const express = require("express");
const app = express(); // this is the api server
const cors = require("cors");
app.use(express.json(), cors()); // this is to parse the json body
const port = 3000;
const database = require("./database/main.js");
// check health
app.get("/health", (_, res) => {
  database.healthCheck();
  res.status(200).send({ message: "Healthy" });
});

// this starts the server by running the .listen() function on the app
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// fish search commands
app.get("/fish", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  fishName = req.query.fishname || "";
  try {
    const fish = await database.fish.getFish(fishName);
    let fishes = [];
    for (let i = 0; i < fish.length; i++) {
      fishes.push(fish[i]);
    }
    res.send({ message: fishes });
  } catch (error) {
    console.log(error);
    res.send({ message: `Error searching fish: ${error}` });
  }
});

// fish management commands
app.delete("/fish", async (req, res) => {
  const fishid = req.query.fishid;
  const fishname = req.query.fishname;

  try {
    const fish = await database.fish.deleteFish(fishname, fishid);
    res.send({ message: `Fish deleted: ${fish.count}` });
  } catch (error) {
    res.send({ message: `Error deleting fish: ${error}` });
  }
});

app.post("/fish", async (req, res) => {
  try {
    const fishname = req.body.fishname;
    await database.fish.insertFish(fishname);
    res.send({ message: `Fish added: ${fishname}` });
  } catch (error) {
    res.send({ message: `Error adding fish: ${error}` });
  }
});
