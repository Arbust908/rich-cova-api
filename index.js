const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const router = require("./api/routes");
const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use((req, _, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
app.get("/img/:route", function (req, res) {
  res.sendFile(req.params.route);
});

app.use("/", router);
// config.dev = process.env.NODE_ENV !== "production";
// dotenv.config({
//   path: "./config.env",
// });
// console.log(process.env);
// *** Start Server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`App en puerto:_${port}...`);
});
