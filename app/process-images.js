import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const APP_ROOT = __dirname;
const ORIGINAL_DIR = path.join(APP_ROOT, 'images/original');
const LARGE_DIR = path.join(APP_ROOT, 'images/large');
const THUMB_DIR = path.join(APP_ROOT, 'images/thumbnails');

if (!fs.existsSync(LARGE_DIR)) fs.mkdirSync(LARGE_DIR, { recursive: true });
if (!fs.existsSync(THUMB_DIR)) fs.mkdirSync(THUMB_DIR, { recursive: true });

// Clear existing
console.log('Clearing existing processed images...');
if (fs.existsSync(LARGE_DIR)) fs.readdirSync(LARGE_DIR).forEach(f => fs.unlinkSync(path.join(LARGE_DIR, f)));
if (fs.existsSync(THUMB_DIR)) fs.readdirSync(THUMB_DIR).forEach(f => fs.unlinkSync(path.join(THUMB_DIR, f)));

const files = fs.readdirSync(ORIGINAL_DIR).filter(f => /\.(jpg|jpeg|png)$/i.test(f));

console.log(`Found ${files.length} images to process.`);

async function processImages() {
    for (const file of files) {
        const inputPath = path.join(ORIGINAL_DIR, file);
        // Normalize to .jpg
        const fileName = path.parse(file).name + '.jpg';
        const largePath = path.join(LARGE_DIR, fileName);
        const thumbPath = path.join(THUMB_DIR, fileName);

        console.log(`Processing ${file} -> ${fileName}`);

        try {
            // Large: 1920 width, maintain aspect ratio
            // Auto-rotate based on EXIF to ensure correct orientation
            await sharp(inputPath)
                .rotate()
                .resize(1920, null, { withoutEnlargement: true })
                .jpeg({ quality: 80, mozjpeg: true })
                .toFile(largePath);

            // Thumb: 400 width
            await sharp(inputPath)
                .rotate()
                .resize(400, null, { withoutEnlargement: true })
                .jpeg({ quality: 70, mozjpeg: true })
                .toFile(thumbPath);

        } catch (err) {
            console.error(`Error processing ${file}:`, err);
        }
    }
    console.log('All done.');
}

processImages();
