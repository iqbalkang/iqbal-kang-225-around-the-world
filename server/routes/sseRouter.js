const express = require("express");
const { setupAddListener } = require("../controllers/sseController");
const isAuthenticated = require("../middlewares/isAuthenticated");

const router = express.Router();

//router.get("/", isAuthenticated, setupAddListener);
router.get("/", setupAddListener);

module.exports = router;
