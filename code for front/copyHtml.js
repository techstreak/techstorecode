const fs = require('fs');
const path = require('path');

const buildPath = path.join(__dirname, 'build');
const indexFile = path.join(buildPath, 'index.html');
const errorFile = path.join(buildPath, '404.html');

fs.copyFile(indexFile, errorFile, (err) => {
  if (err) {
    console.error('Error copying file:', err);
    return;
  }
  console.log('404.html was created successfully from index.html');
});
