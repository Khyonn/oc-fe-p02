const fs = require("fs");
const sharp = require("sharp");

const popularImages = [
  "hotel-le-soleil-du-matin.jpg",
  "au-coeur-de-leau-chambre-dhotes.jpg",
  "hotel-tout-bleu-et-blanc.jpg",
];
const sizes = {
  popular: [126, 156, 222],
  accommodations: [234, 294, 517],
  activities: [284, 304, 527],
};

["accommodations", "activities"].forEach((folderName) => {
  fs.readdir(`${__dirname}/images/${folderName}`, (errors, files) => {
    if (errors) {
      return;
    }

    files.forEach((fileName) => {
      let [small, medium, large] = sizes[folderName];

      if (popularImages.includes(fileName)) {
        [small, medium, large] = sizes.popular;
      }
      Object.entries({ small, medium, large }).forEach(([sizeName, width]) => {
        sharp(`${__dirname}/images/${folderName}/${fileName}`)
          .resize({ width })
          .toFile(`../assets/images/${folderName}/${sizeName}/${fileName}`);
      });
    });
  });
});
