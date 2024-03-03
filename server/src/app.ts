import express from "express";
import { expressjwt } from "express-jwt";

// const path = require("path");
// import cors from "cors";
// const morgan = require("morgan");

// const api = require("./routes/api");

const app = express();
// app.use(cors({ origin: `http://localhost:${process.env.ORIGIN_PORT}` }));
// app.use(morgan("combined"));
// app.use(express.json());

// app.use(express.static(path.join(__dirname, "..", "public")));
// app.use("/v1", api);

// }).unless({ path: ["/v1/login"] }));

// app.use((req, res, next) => {
//   res.status(404).json({ error: "Not found" });
// });

app.use(
  expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    credentialsRequired: false,
  })
);

export default app;
