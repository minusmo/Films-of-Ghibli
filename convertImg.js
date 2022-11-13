const sharp = require('sharp');
const fs = require('fs');
const directory = "./src/assets/images/itemImgs";

fs.readdirSync(directory).forEach(file => {
  sharp(`${directory}/${file}`)
    .resize(300, 300) // width, height
    .toFile(`${directory}/${file}-small.jpg`);
});