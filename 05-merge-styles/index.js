const fsPromises = require('fs/promises');
const path = require('path');

const stylesFolder = path.join(__dirname, 'styles');
const projectFolder = path.join(__dirname, 'project-dist');
const styleFile = path.join(projectFolder, 'bundle.css');

async function mergeStyles(stylesFolder, projectFolder, styleFile) {
  try {
    const files = await fsPromises.readdir(stylesFolder, {
      withFileTypes: true,
    });
    let cssCombined = '';

    for (const file of files) {
      if (file.isFile() && path.extname(file.name) === '.css') {
        const filePath = path.join(stylesFolder, file.name);
        const contentOfFile = await fsPromises.readFile(filePath, 'utf-8');
        cssCombined += contentOfFile + '\n';
      }
    }

    await fsPromises.mkdir(projectFolder, { recursive: true }); //if exists, no problems because of {recursive}
    await fsPromises.writeFile(styleFile, cssCombined, 'utf-8');

    console.log('All styles from separate files are combined in bundle.css');
  } catch (error) {
    console.log('An error has occurred when merging styles: ', error);
  }
}

mergeStyles(stylesFolder, projectFolder, styleFile);
