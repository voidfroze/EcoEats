const express = require("express");
const router = express.Router();

const { getCharity, addCharity, removeCharity } = require("../controllers/charityController");
const { getStore, addStore, removeStore } = require("../controllers/storeController");
const { register, login, logout, getUsers, addToCart, deleteUser, getIdFromCookie } = require("../controllers/userController");

router.get("/", (req, res) => {
  console.log("what's up dawg ?!");
});

// Routes for stores
router.get("/api/getStore", getStore);
router.post("/api/addStore", addStore);
router.delete("/api/removeStore/:id", removeStore);

// Routes for charities
router.get("/api/getCharity", getCharity);
router.post("/api/addCharity", addCharity);
router.delete("/api/removeCharity/:id", removeCharity);

// Routes for user operations
router.post("/api/register", register);
router.post("/api/login", login);
router.get("/api/logout", logout);
router.get("/api/getUsers", getUsers);
router.post("/api/cart", addToCart);
router.delete("/api/deleteUser", deleteUser);
router.get("/api/user-id", getIdFromCookie);

module.exports = router;
