const express = require("express");
const app = express();
const axios = require("axios");
const { filter, matches } = require("lodash");

const EXTERNAL_URL =
  "https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json";

app.get("/", async (req, res) => {
  try {
    const { data } = await axios.get(EXTERNAL_URL);
    let result = filter(data, matches(req.query));
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000!");
});
