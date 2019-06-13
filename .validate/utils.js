const path = require('path');
const fs = require('fs-extra');
const { Signale } = require('signale');

function isDirectory(dirPath) {
  return fs.lstatSync(dirPath).isDirectory();
}

function listFiles(dirPath) {
  return fs.pathExistsSync(dirPath) ? fs.readdirSync(dirPath).filter(fileName => !fileName.startsWith('.')) : [];
}

function listDirectories(dirPath) {
  return listFiles(dirPath).filter(fileName => isDirectory(path.resolve(dirPath, fileName)));
}

const signale = new Signale();

module.exports = {
  isDirectory,
  listFiles,
  listDirectories,
  signale,
};
