const express = require("express");
const todoModel = require("../model/todoModel.js");
const route = express.Router();

route.post("/create", async (req, res) => {
  const data = req.body;
  const save = new todoModel(data);
  save.save();
  res.send( save );
});

route.post("/mark-as-done", async (req, res) => {
  const { id } = req.body;

  const update = await todoModel.updateOne(
    { _id: id },
    { $set: { status: true } }
  );

  res.send("updated");
});

route.post("/mark-as-not-done", async (req, res) => {
  const { id } = req.body;
  const update = await todoModel.updateOne(
    { _id: id },
    { $set: { status: false } }
  );

  res.send("updated");
});

route.post("/move-to-directory", async (req, res) => {
  const { directoryid, id } = req.body;
  const update = await todoModel.updateOne(
    { _id: id },
    { $set: { directoryid: directoryid } }
  );
  res.send("moved to directory");
});

route.post("/list", async (req, res) => {
  const { pageNumber } = req.body;
  const data = await todoModel
    .find()
    .sort({ _id: 1 })
    .skip(pageNumber > 0 ? (pageNumber - 1) * 5 : 0)
    .limit(5);

  res.send({ message: "success", data, pageNumber });
});
route.post("/list/status-done", async (req, res) => {
  const { pageNumber, status } = req.body;
  console.log({ status });
  const data = await todoModel
    .find({ status })
    .sort({ _id: 1 })
    .skip(pageNumber > 0 ? (pageNumber - 1) * 5 : 0)
    .limit(5);

  res.send( data );
});

route.post("/list/status-not-done", async (req, res) => {
  const { pageNumber, status } = req.body;
  const data = await todoModel
    .find({ status })
    .sort({ _id: 1 })
    .skip(pageNumber > 0 ? (pageNumber - 1) * 5 : 0)
    .limit(5);

  res.send({data, pageNumber });
});

route.post("/list/date", async (req, res) => {
  const { pageNumber } = req.body;
  const data = await todoModel
    .find()
    .sort({ _id: -1 })
    .skip(pageNumber > 0 ? (pageNumber - 1) * 5 : 0)
    .limit(5);

  res.send({data, pageNumber });
});

module.exports = route;
