const express = require("express");
const cors = require("cors");
const app = express();

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  return res.status(200).send("Product's Server Healthy Line");
});
app.listen(8082, () => {
  console.log("Product's Server running on ", 8082);
});
