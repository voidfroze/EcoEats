const asyncHandler = require("express-async-handler");
const store = require("../models/storeModel");

// Fetch all stores
exports.getStore = asyncHandler(async (req, res) => {
  try {
    const stores = await store.find({});
    console.log("Fetched stores:", stores);
    if (stores.length === 0) {
      return res.status(404).json({ success: false, error: "No stores found." });
    }
    res.status(200).json({ success: true, count: stores.length, data: stores });
  } catch (error) {
    console.error("Error fetching stores:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Add a new store
exports.addStore = asyncHandler(async (req, res) => {
  try {
    const newStore = await store.create(req.body);
    res.status(201).json({ success: true, data: newStore });
  } catch (error) {
    console.error("Error adding store:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

// Remove a store
exports.removeStore = asyncHandler(async (req, res) => {
  try {
    const removedStore = await store.findByIdAndRemove(req.params.id);
    if (!removedStore) {
      return res.status(404).json({ success: false, error: "Store not found" });
    }
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    console.error("Error removing store:", error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
