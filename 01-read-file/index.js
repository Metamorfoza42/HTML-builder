const path = require('path');
const fs = require('fs');

const pathToFile = path.join(__dirname, 'text.txt');
const stream = fs.createReadStream(pathToFile, 'utf-8');

let dataStorage = '';
stream.on('data', (chunk) => (dataStorage += chunk));
stream.on('end', () => console.log(dataStorage));
stream.on('error', (error) => console.log('Error', error.message));
