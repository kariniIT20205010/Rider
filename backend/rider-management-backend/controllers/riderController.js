const Rider = require('../models/Rider');

// CREATE
exports.createRider = async (req, res) => {
  try {
    const rider = await Rider.create(req.body);
    res.status(201).json(rider);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// READ - paginated & searchable
exports.getRiders = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const query = {
      $or: [
        { Name: { $regex: search, $options: 'i' } },
        { Email: { $regex: search, $options: 'i' } },
        { Id: isNaN(search) ? -1 : parseInt(search) }
      ]
    };

    const riders = await Rider.find(query)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Rider.countDocuments(query);

    res.json({ data: riders, total });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// READ ONE
exports.getRiderById = async (req, res) => {
  try {
    const rider = await Rider.findById(req.params.id);
    if (!rider) return res.status(404).json({ error: "Rider not found" });
    res.json(rider);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
exports.updateRider = async (req, res) => {
  try {
    const rider = await Rider.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!rider) return res.status(404).json({ error: "Rider not found" });
    res.json(rider);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// DELETE
exports.deleteRider = async (req, res) => {
  try {
    const rider = await Rider.findByIdAndDelete(req.params.id);
    if (!rider) return res.status(404).json({ error: "Rider not found" });
    res.json({ message: "Rider deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
