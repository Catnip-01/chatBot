const express = require("express");
const router = express.Router();
const {
  geminiQuery,
  chatbotQuery,
} = require("../controllers/geminiController");
const { authenticateToken } = require("../middleware/authMiddleware");

// router.get("/chatbot", authenticateToken, (req, res) => {
//   console.log("entered chatbot query");
//   try {
//     console.log(
//       "request header : " +
//         JSON.stringify(req.headers.authorization.split(" ")[1])
//     );
//     chatbotQuery(req, res);
//   } catch (err) {
//     console.log("error in chatbot query : " + err);
//     res
//       .status(500)
//       .json({ message: "Error in chatbot query", error: err.message });
//   }
// });
router.get("/chatbot", authenticateToken, (req, res) => {
  chatbotQuery;
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
