const express = require("express");
const directoryModel = require("../model/directoryModel.js");
const route = express.Router();

route.post("/list", async (req, res) => {
  const data = await directoryModel.find({});
  res.send( data );
});

route.post("/create", async (req, res) => {
  const { directoryName } = req.body;
  const directory = new directoryModel({ directoryName,});
  directory.save();
  res.send( directory );
});

route.post("/remove", async (req, res) => {
  const { id } = req.body;
  const directory = await directoryModel.deleteOne({ _id: id });

  if (directory.deletedCount == 1) {
    res.send("Deleted");
  } 
});

module.exports = route;