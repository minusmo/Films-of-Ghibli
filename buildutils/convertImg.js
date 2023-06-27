const sharp = require('sharp');
const fs = require('fs');
const DIR_PATH = "./src/assets/images/itemImgs";
const reducedWidth = 300;
const reducedHeight = 300;

fs.readdirSync(DIR_PATH).forEach(file => {
  sharp(`${DIR_PATH}/${file}`)
    .resize(reducedWidth, reducedHeight) // width, height
    .toFile(`${DIR_PATH}/${file}-small.jpg`);
});