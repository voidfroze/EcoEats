const asyncHandler = require("express-async-handler");
const charity = require("../models/charityModel");

exports.getCharity = asyncHandler(async (req, res) => {
  try {
    // Fetch all charities from the database
    const charities = await charity.find({});

    // Log the fetched charities to check if data exists
    console.log("Fetched charities:", charities);

    if (charities.length === 0) {
      return res.status(404).json({ success: false, error: "No charities found." });
    }

    // Respond with the data
    res.status(200).json({ success: true, count: charities.length, data: charities });
  } catch (error) {
    // Log any errors that occur during the process
    console.error("Error fetching charities:", error);
    // If an error occurs, respond with an error message
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});
