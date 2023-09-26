//copied from techshop

const express = require("express");
const app = express.Router();
const { User } = require("../db");

//POST /api/auth/login
app.post("/login", async (req, res, next) => {
  try {
    res.send(await User.authenticate(req.body));
  } catch (ex) {
    res
      .status(401)
      .json({ message: "incorrect username or password", error: ex.message });
    next(ex);
  }
});

//POST /api/auth/register
app.post("/register", async (req, res, next) => {
  try {
    res.send(await User.encrypt(req.body));
  } catch (ex) {
    res
      .status(500)
      .json({ message: "could not register user", error: ex.message });
    next(ex);
  }
});

//GET /api/auth - returns single user after authentication
app.get("/", async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization));
  } catch (ex) {
    next(ex);
  }
});

//PUT /api/auth/:id - returns updated single user after authentication
app.put("/:id", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    res.send(await user.update(req.body));
  } catch (ex) {
    res.status(500).json({ message: "cannot update that user info", ex });
    next(ex);
  }
});

//DELETE /api/auth - deletes single user after authentication
app.delete("/", async (req, res, next) => {
  try {
    const user = await User.findByToken(req.headers.authorization);
    await user.destroy();
    res.status(204).end();
  } catch (ex) {
    res.status(500).json({ message: "cannot delete that user", ex });
    next(ex);
  }
});

module.exports = app;
