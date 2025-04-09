const mongoose = require('mongoose');

const RiderSchema = new mongoose.Schema({
  Id: { type: Number, required: true, unique: true },
  Name: { type: String, required: true },
  Email: { type: String, required: true, unique: true },
  Position: { type: String, required: true },
  NRIC: { type: String, required: true },
  Status: { type: Boolean, required: true },
  Image: { type: String } // store image URL or filename
}, { timestamps: true });

module.exports = mongoose.model('Rider', RiderSchema);
