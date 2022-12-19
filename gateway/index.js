const express = require("express");
const cors = require("cors");
const proxy = require("express-http-proxy");
const app = express();

app.use(express.json());
app.use(cors());

app.use("/customer", proxy("http://localhost:8081"));
app.use("/products", proxy("http://localhost:8082"));
app.use("/shopping", proxy("http://localhost:8083"));

app.get("/", (req, res) => {
  return res.status(200).send("API Gateway Server Healthy Line");
});
app.listen(8080, () => {
  console.log("API Gateway is active at: ", 8080);
});
