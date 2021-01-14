const express = require("express");
const router = express.Router();
const burger = require("../models/burger");

//creating all routes and set up the logic thats required
router.get("/", (req, res) => {
  burger.selectAll((data) => {
    const hbsObject = {
      burgers: data,
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", (req, res) => {
  burger.insertOne(["burger_name"], [req.body.burger_name], (result) => {
    res.json({ id: result.insertId });
    console.log("router.post burger_name res ", req.body.burger_name);
  });
});

router.put("/api/burgers/:id", (req, res) => {
  const condition = `id = ${req.params.id}`;

  console.log("condition", condition);

  burger.updateOne({ devoured: true }, condition, (result) => {
    if (result.changedRows === 0) {
      //if nothing was changed then ID must not exist
      return res.status(404).end();
    }
    res.status(200).end();
  });
});

module.exports = router;
