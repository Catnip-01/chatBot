const express = require("express");
const router = express.Router();
const {
  geminiQuery,
  chatbotQuery,
} = require("../controllers/geminiController");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "secret";
// const { authenticateToken } = require("../middleware/authMiddleware");

const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("here is the token : " + token);
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: "Forbidden" });

    req.user = user;
    next(); // Call next() to proceed to the next middleware or route handler
  });
};

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
