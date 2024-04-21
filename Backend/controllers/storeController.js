const asyncHandler = require("express-async-handler");
const store = require("../models/storeModel");

exports.getStore = asyncHandler(async (req, res) => {
  try {
    // Fetch all stores from the database
    const stores = await store.find({});

    // Log the fetched stores to check if data exists
    console.log("Fetched stores:", stores);

    if (stores.length === 0) {
      return res.status(404).json({ success: false, error: "No stores found." });
    }

    // Respond with the data
    res.status(200).json({ success: true, count: stores.length, data: stores });
  } catch (error) {
    // Log any errors that occur during the process
    console.error("Error fetching stores:", error);
    // If an error occurs, respond with an error message
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
