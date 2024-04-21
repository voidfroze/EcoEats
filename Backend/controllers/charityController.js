const asyncHandler = require("express-async-handler");
const charity = require("../models/charityModel");

// Fetch all charities
exports.getCharity = asyncHandler(async (req, res) => {
  try {
    const charities = await charity.find({});
    console.log("Fetched charities:", charities);
    if (charities.length === 0) {
      return res.status(404).json({ success: false, error: "No charities found." });
    }
    res.status(200).json({ success: true, count: charities.length, data: charities });
  } catch (error) {
    console.error("Error fetching charities:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Add a new charity
exports.addCharity = asyncHandler(async (req, res) => {
  try {
    const newCharity = await charity.create(req.body);
    res.status(201).json({ success: true, data: newCharity });
  } catch (error) {
    console.error("Error adding charity:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Remove a charity
exports.removeCharity = asyncHandler(async (req, res) => {
  try {
    const removedCharity = await charity.findByIdAndRemove(req.params.id);
    if (!removedCharity) {
      return res.status(404).json({ success: false, error: "Charity not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error("Error removing charity:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
