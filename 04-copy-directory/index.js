const fsPromises = require('fs/promises');
const path = require('path');

const scrFolderPath = path.join(__dirname, 'files');
const destFolderPath = path.join(__dirname, 'files-copy');

//Made on Windows machine
async function copyDirectory(srcFolder, destFolder) {
  try {
    await fsPromises.mkdir(destFolder, { recursive: true });

    const srcFiles = await fsPromises.readdir(srcFolder, {
      withFileTypes: true,
    });
    const destFiles = await fsPromises.readdir(destFolder, {
      withFileTypes: true,
    });

    //Copy files
    for (const file of srcFiles) {
      if (file.isFile()) {
        const srcFilePath = path.join(srcFolder, file.name);
        const destFilePath = path.join(destFolder, file.name);
        await fsPromises.copyFile(srcFilePath, destFilePath);
        // console.log(`Copied ${file.name} from source folder`);
      }
    }

    //Delete files from destFolder, that was already deleted from srcFolder
    const srcFileNames = srcFiles.map((file) => file.name);

    for (const file of destFiles) {
      if (!srcFileNames.includes(file.name)) {
        const deleteFilePath = path.join(destFolder, file.name);
        await fsPromises.unlink(deleteFilePath);
        console.log(`Deleted ${file.name} from destination folder`);
      }
    }
    console.log('Copying process completed');
  } catch (error) {
    console.log('An error has occurred when coping directory: ', error);
  }
}

copyDirectory(scrFolderPath, destFolderPath);
