const express = require("express");
const { generateFile } = require("./generateFile");
const { executeCpp } = require("./executeCpp");
const cors = require("cors");
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.listen(5000, () => {
  console.log("server is running on port 5000");
});

app.get("/", (req, res) => {
  return res.json("Hi");
});

app.post("/run", async (req, res) => {
  const { language = "cpp", code } = req.body;
  if (code == undefined || code == "")
    return res.status(400).json({
      success: false,
      error: "Empty code body!",
    });
  try {
    //we need to genereate c++ file with cpp code from the request
    const filePath = await generateFile(language, code);
    console.log(filePath, "Filepath");

    //F:\Fullstack\onlineCompiler\backend\codes\849a542a-4235-4811-ada9-a48876f2a3aa.cpp
    // filepath=> 849a542a-4235-4811-ada9-a48876f2a3aa.cpp

    //we need to run the file and then send the response
    const output = await executeCpp(filePath);
    console.log(output,"Output")
    return res.json({ filePath, output }); // req.body will give all the language and code from the browser
  } catch (err) {
    res.status(500).json({ err });
  }
});
