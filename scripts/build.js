
const { resolve } = require('path');
const { existsSync, lstatSync, readdirSync } = require('fs');

function readFileList(dir) {
  const fileList = [];
  const dirPath = resolve(`./docs/notes/${dir}`);
  const isDir = existsSync(dirPath) 
  if (!isDir) {
    return fileList;
  }
  const files = readdirSync(dirPath);
  files.forEach((item) => {
    const filename = item.slice(0, -3);
    const name = filename.split('-')[1]
    fileList.push([
      `${dir}/${filename}`,
      `${name}`
    ]);
  });
  return fileList;
}

module.exports = readFileList;
