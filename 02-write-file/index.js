const fs = require('fs');
const path = require('path');
const { stdin, stdout, exit } = process;

const pathToFile = path.join(__dirname, 'output.txt');
const outputStream = fs.createWriteStream(pathToFile);

stdout.write('Write some text here to append it to output.txt:\n');
stdin.on('data', (data) => {
  let dataToString = data.toString().trim();
  if (dataToString === 'exit') {
    exit();
  }
  outputStream.write(data);
});

process.on('SIGINT', () => exit());
process.on('exit', () => stdout.write('Thank you for using the program!\n'));
