const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const RAW_DIR = path.join(__dirname, 'raw-images');
const STAGING_DIR = path.join(__dirname, 'staging');

const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.tiff', '.bmp', '.webp', '.avif'];

async function processFolder(folderName) {
  const inputDir = path.join(RAW_DIR, folderName);
  const outputFolderName = folderName + '_processed';
  const outputDir = path.join(STAGING_DIR, outputFolderName);

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const files = fs.readdirSync(inputDir).filter(file =>
    IMAGE_EXTENSIONS.includes(path.extname(file).toLowerCase())
  ).slice(0, 50);

  if (files.length === 0) {
    console.log(`No images found in ${folderName}`);
    return;
  }

  console.log(`Processing ${files.length} image(s) from "${folderName}" -> "${outputFolderName}"`);

  for (let i = 0; i < files.length; i++) {
    const inputFile = path.join(inputDir, files[i]);
    const outputFileName = `${folderName}-${i + 1}.webp`;
    const outputFile = path.join(outputDir, outputFileName);

    await sharp(inputFile)
      .rotate()
      .resize(800, 800, { fit: 'inside', withoutEnlargement: false })
      .webp({ quality: 75 })
      .withMetadata(false)
      .toFile(outputFile);

    console.log(`  [${i + 1}/${files.length}] ${files[i]} -> ${outputFileName}`);
  }

  console.log(`Done: "${outputFolderName}"\n`);
}

async function main() {
  const targetFolder = process.argv[2];

  if (targetFolder) {
    const inputDir = path.join(RAW_DIR, targetFolder);
    if (!fs.existsSync(inputDir)) {
      console.error(`Folder not found: raw-images/${targetFolder}`);
      process.exit(1);
    }
    await processFolder(targetFolder);
  } else {
    const folders = fs.readdirSync(RAW_DIR, { withFileTypes: true })
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name);

    if (folders.length === 0) {
      console.log('No folders found in raw-images/');
      return;
    }

    for (const folder of folders) {
      await processFolder(folder);
    }
  }
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
