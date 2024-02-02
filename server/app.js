const express = require("express");
// const path = require("path");
const cors = require("cors");
// const morgan = require("morgan");

// const api = require("./routes/api");

const app = express();
app.use(cors({ origin: `http://localhost:${process.env.PORT}` }));
// app.use(morgan("combined"));
// app.use(express.json());

// app.use(express.static(path.join(__dirname, "..", "public")));
// app.use("/v1", api);

module.exports = app;