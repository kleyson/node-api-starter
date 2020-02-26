const mongoose = require("mongoose");

const SpotSchema = new mongoose.Schema({
  description: { type: String, required: "Description is required" },
  tags: [String],
  location: {
    type: {
      type: String,
      default: "Point"
    },
    coordinates: [
      {
        type: Number,
        required: "Coordinates are required"
      }
    ],
    address: {
      type: String,
      required: "Address is required"
    }
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "UserSchema",
    required: "User is required"
  }
});

module.exports = mongoose.model("spot", SpotSchema);
