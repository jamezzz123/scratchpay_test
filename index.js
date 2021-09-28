const express = require("express");
const app = express();
const axios = require("axios");
const { filter, matches } = require("lodash");

const EXTERNAL_URL =
  "https://storage.googleapis.com/scratchpay-code-challenge/dental-clinics.json";

/*
 * This searches the external json file and returns the data
 * For various search criteria in accordanace with the request result object
 *
 * example:
 * you can search for the clinics by name and StateName
 * know the EXTERNEL API result object structure is something like this
 * [
 *  {
 *   "name":"Scratchpay Official practice",
 *   "stateName":"Tennessee",
 *   "availability":{
 *      "from":"00:00","to":"24:00"
 *     }
 *   }
 * ]
 * then we can have something like this
 * GET /clinics?name="Scratchpay Official practice"&stateName=Tennessee
 */
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
  console.log("App listening on port 3000!");
});
