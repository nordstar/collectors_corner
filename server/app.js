const express = require("express");
const app = express();
const path = require("path");

app.use(express.json());

app.use("/dist", express.static(path.join(__dirname, "../dist")));
app.use("/static", express.static(path.join(__dirname, "../static")));

// app.get("/", (req, res) =>
//   res.sendFile(path.join(__dirname, "../static/index.html"))
// );

// app.use("/api/addresses", require("./api/addresses"));
// app.use("/api/auth", require("./api/auth"));
// app.use("/api/orders", require("./api/orders"));
// app.use("/api/products", require("./api/products"));
// app.use("/api/reviews", require("./api/reviews"));

// app.use("/api/checkout", require("./api/checkout"));

module.exports = app;