const express = require("express");
const router = express.Router();
const {
  geminiQuery,
  chatbotQuery,
} = require("../controllers/geminiController");
const { authenticateToken } = require("../middleware/authMiddleware");

try {
  router.get("/chatbot", (req, res) => {
    chatbotQuery(req, res);
  });
} catch (err) {
  console.log("error in chatbot query : " + err);
}

try {
  router.post("/geminiQuery", (req, res) => {
    geminiQuery(req, res);
  });
} catch (err) {
  console.log("this is location of error : " + err);
}

module.exports = router;
