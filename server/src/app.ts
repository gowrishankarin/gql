import express from "express";
// const path = require("path");
import cors from "cors";
// const morgan = require("morgan");

// const api = require("./routes/api");

const app = express();
app.use(cors({ origin: `http://localhost:${process.env.ORIGIN_PORT}` }));
// app.use(morgan("combined"));
// app.use(express.json());

// app.use(express.static(path.join(__dirname, "..", "public")));
// app.use("/v1", api);

export default app;
