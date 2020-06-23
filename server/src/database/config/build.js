const { readFileSync } = require('fs');
const { join } = require('path');

const connection = require('./connection');

const dbBuild = () => {
  const dbFile = readFileSync(join(__dirname, 'build.sql')).toString();
  const category = readFileSync(join(__dirname, 'category.sql')).toString();
  const fakeData = readFileSync(join(__dirname, 'fakeData.sql')).toString();
  return connection
    .query(dbFile)
    .then(() => connection.query(category))
    .then(() => connection.query(fakeData));
};

module.exports = dbBuild;
