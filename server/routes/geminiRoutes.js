const express = require("express");
const router = express.Router();
const {
  geminiQuery,
  chatbotQuery,
} = require("../controllers/geminiController");

const { authenticateToken } = require("../middleware/authMiddleware");

router.get("/chatbot", authenticateToken, (req, res) => {
  //   console.log(req.headers);
  chatbotQuery(req, res);
});

router.post("/geminiQuery", (req, res) => {
  try {
    geminiQuery(req, res);
  } catch (err) {
    console.log("this is location of error : " + err);
    res
      .status(500)
      .json({ message: "Error in gemini query", error: err.message });
  }
});

module.exports = router;
