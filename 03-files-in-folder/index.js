const fsPromises = require('fs/promises');
const path = require('path');

const pathToFolder = path.join(__dirname, 'secret-folder');

//Made on Windows machine
async function filesInFolder(folderPath) {
  try {
    const files = await fsPromises.readdir(folderPath, { withFileTypes: true });
    // console.log(files);

    for (const file of files) {
      if (file.isFile()) {
        const filePath = path.join(folderPath, file.name);
        const fileStats = await fsPromises.stat(filePath);
        // console.log(file.name, fileStat);
        const fileSizeKb = (fileStats.size / 1024).toFixed(3);
        const fileExtension = path.extname(filePath);

        console.log(
          // prettier-ignore
          `${path.basename(filePath, fileExtension)} - ${fileExtension.slice(1)} - ${fileSizeKb} Kilobytes`,
        );
      }
    }
  } catch (err) {
    console.log('An error has occurred when reading directory ', err);
  }
}

filesInFolder(pathToFolder);
