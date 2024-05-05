const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const { stdout, stderr } = require("process");
//output folder
const outputPath = path.join(__dirname, "outputs");
if (!fs.existsSync(outputPath)) {
  fs.mkdirSync(outputPath, { recursive: true });
}
// outputPath => F:\Fullstack\onlineCompiler\backend\outputs

//takes the file path , executes it and returns the result in file in output folder
const executeCpp = (filepath) => {
  const jobId = path.basename(filepath, path.extname(filepath)); //849a542a-4235-4811-ada9-a48876f2a3aa
  // /onlineCompiler\backend\codes\849a542a-4235-4811-ada9-a48876f2a3aa.cpp
  // console.log(jobId,"jobid")
  const outPath = path.join(outputPath, `${jobId}.exe`); //F:\Fullstack\onlineCompiler\backend\outputs\849a542a-4235-4811-ada9-a48876f2a3aa.exe
  // console.log(outPath, "out");
  return new Promise((resolve, reject) => {
    // console.log(filepath, "filepath");
    exec(
      `g++ ${filepath} -o ${outPath} && cd ${outputPath} && ${jobId}.exe`,
      (error, stdout, stderr) => {
        error && reject({ error, stderr });
        stderr && reject(stderr);
        resolve(stdout);
      }
    );
  });
};
module.exports = {
  executeCpp,
};
