const express = require("express");
const router = express.Router();

const { getCharity } = require("../controllers/charityController");
const { getStore } = require("../controllers/storeController");
router.get("/", (req, res) => {
  console.log("what's up dawg ?!");
});

router.get("/api/getCharity", getCharity);
router.get("/api/getStore", getStore);

module.exports = router;
