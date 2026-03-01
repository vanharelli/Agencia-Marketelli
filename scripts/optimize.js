import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const directories = ['public', 'src/assets'];

async function processDirectory(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      await processDirectory(filePath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const outputFilePath = filePath.replace(ext, '.webp');
        
        console.log(`Converting: ${filePath} -> ${outputFilePath}`);

        try {
          await sharp(filePath)
            .webp({ quality: 80 })
            .toFile(outputFilePath);

          console.log(`Success! Removing original: ${filePath}`);
          fs.unlinkSync(filePath);
        } catch (error) {
          console.error(`Error converting ${filePath}:`, error);
        }
      }
    }
  }
}

async function run() {
  console.log('Starting image optimization...');
  for (const dir of directories) {
    await processDirectory(dir);
  }
  console.log('Image optimization complete.');
}

run();
