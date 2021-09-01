const fs = require('fs');
const { resolve } = require('path');
const path = require('path');

const getFileContent = (filename) => {
  const promise = new Promise((resolve, reject) => {
    const fullFilename = path.resolve(__dirname, 'data', filename);
    fs.readFile(fullFilename, (err, data) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(JSON.parse(data.toString()))
    })
  });
  return promise;
}

getFileContent('a.json').then((aData) => {
  console.log('aData', aData);
  return getFileContent(aData.next);
}).then((bData) => {
  console.log('bData', bData);
  return getFileContent(bData.next);
}).then((cData) => {
  console.log('cData', cData);
})
