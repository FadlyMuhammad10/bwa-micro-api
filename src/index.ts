import { errorMiddleware } from "./middleware/error-middleware";
import { apiRouter } from "./router/api";
import { publicRouter } from "./router/public-api";

const express = require("express");

var cors = require("cors");
var path = require("path");

// require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(publicRouter);
app.use(apiRouter);

app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
