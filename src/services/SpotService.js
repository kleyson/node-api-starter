const Spot = require("../models/Spot");

const getAll = async (req, res) => {
  const spots = await Spot.find({ user: req.user._id });
  res.json(spots);
};

const get = async (req, res) => {
  const spot = await Spot.findById({ _id: req.params.id });
  if (spot === null) {
    res.status(404).send({ message: "Spot not found" });
    return;
  }
  res.json(spot);
};

const save = async (req, res) => {
  const newSpot = new Spot(req.body);
  newSpot.user = req.user._id;
  const savedSpot = await newSpot.save();
  res.status(201).json(savedSpot);
};

const update = async (req, res) => {
  req.body.location.type = "Point";

  const spot = await Spot.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true
  }).exec();

  if (spot === null) {
    res.status(404).send({ message: "Spot not found" });
    return;
  }
  res.status(200).json(spot);
};

const remove = async (req, res) => {
  const { result } = await Spot.remove({ _id: req.params.id });
  if (result.n === 0) {
    res.status(404).send({ message: "Spot not found" });
    return;
  }
  res.status(204).send();
};

module.exports = {
  getAll,
  get,
  save,
  update,
  remove
};
