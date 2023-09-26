const express = require("express");
const app = express.Router();
const { Item, User } = require("../db");



// GET all items
app.get("/", async (req, res) => {
  try {

    const items = await Item.findAll();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET items by category??
app.get("/category/:category", async (req, res) => {
  const { category } = req.params;
  try {
    const items = await Item.findAll({ where: { category } });
    if (!items.length) {
      return res
        .status(404)
        .json({ error: "No items found with this category" });
    }
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET single item by ID
app.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const item = await Item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: "item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/ebay", async(req, res, next) =>{



  
});


// POST single item (Admin only)
app.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    if (!user.isAdmin) {
      return res.status(403).json({ error: "You do not have permission" });
    }
    const item = await item.create(req.body);
    res.json(item);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE single item (Admin only)
app.delete("/:id", async (req, res) => {
  //need to authorize admin somehow here
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);
    if (!user.isAdmin) {
      return res.status(403).json({ error: "You do not have permission" });
    }
    const { id } = req.params;
    const item = await item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: "item not found" });
    }
    await item.destroy();
    res.sendStatus(204);
  } catch (error) {
    console.log("ERRRRRROOOOORRR------------------", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// PUT single item details (Admin only)
app.put("/:id", async (req, res) => {
  //need to authorize admin somehow here

  const { id } = req.params;
  try {
    const item = await item.findByPk(id);
    if (!item) {
      return res.status(404).json({ error: "item not found" });
    }
    await item.update(req.body);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = app;
