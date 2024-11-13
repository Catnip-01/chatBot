// exports.geminiQuery = async (req, res) => {
//   async function run() {
//     try {
//       const model = genAi.generativeModel({ model: "gemini-1.5-flash" });
//       const query = req.query.items;
//       const result = await model.generateContent(query);

//       const responseContent = await result.response.text();
//       console.log(responseContent);

//       res.status(200).send(responseContent);
//     } catch (err) {
//       res.status(500).send("error generating content : " + error.message);
//     }
//   }

//   run();
// };

exports.chatbotQuery = async (req, res) => {
  res.status(200).json({ user: req.user });
};

exports.geminiQuery = async (req, res) => {
  async function run() {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const prompt = req.body.items;
      const result = await model.generateContent(prompt);
      const responseContent = result.response.text();
      console.log(result.response.text());
      res.status(200).send(responseContent);
    } catch (error) {
      res.status(500).json({ message: "message + " + error });
    }
  }
  run();
};

// app.get("/chatbot", authenticateToken, (req, res) => {
//   console.log("entered here");
//   // res.json({ message: "this is a protected route", user: req.user });
//   res.status(200).json({ user: req.user });
// });

// app.get("/geminiQuery", (req, res) => {
//   async function run() {
//     try {
//       const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
//       const query = req.query.items;
//       const result = await model.generateContent(query);

//       const responseContent = await result.response.text();
//       console.log(responseContent);

//       res.status(200).send(responseContent);
//     } catch (error) {
//       res.status(500).send("Error generating content: " + error.message);
//     }
//   }

//   run();
// });
