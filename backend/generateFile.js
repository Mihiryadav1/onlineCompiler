// this file generates cpp code file

const path = require("path");
const fs = require("fs");
const dirCodes = path.join(__dirname, "codes"); //path to codes folder if it exists
const { v4: uuid } = require("uuid"); //v4 is a dunction in uuid packafe which is named as uuid by me

//if codes folder is not present then create a new directory first
if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true }); //make directory in sychronized  way
}
//format is the extension of code file like .cpp /.js
const generateFile = async (format, code) => {
  //generating code File id
  const jobId = uuid(); //uniqueid
  const fileName = `${jobId}.${format}`;
  const filePath = path.join(dirCodes, fileName);
  console.log(filePath);
  await fs.writeFileSync(filePath, code);
  return filePath;
};
module.exports = {
  generateFile,
};
