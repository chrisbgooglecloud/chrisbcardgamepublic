import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs/promises';
import path from 'path';

// Assuming script is run from project root, or adjusting for scripts/ location if run via node scripts/remove-backgrounds.js
// If run from root: process.cwd() is root.
// We moved 'Game ARt' to 'game_art_source'
// We moved this script to 'scripts/'

// If we run `node scripts/remove-backgrounds.js` from root:
const inputDir = 'game_art_source';
const outputDir = 'public/assets_no_bg';

async function processImages() {
    try {
        // Ensure the output directory exists
        await fs.mkdir(outputDir, { recursive: true });
        console.log(`Output directory created at: ${outputDir}`);

        const files = await fs.readdir(inputDir);
        const pngFiles = files.filter(file => file.toLowerCase().endsWith('.png'));

        if (pngFiles.length === 0) {
            console.log('No PNG files found in the input directory.');
            return;
        }

        console.log(`Found ${pngFiles.length} PNG files to process...`);

        for (const file of pngFiles) {
            const inputPath = path.join(inputDir, file);
            const outputPath = path.join(outputDir, file);

            try {
                console.log(`Processing: ${file}`);
                // The library can take a path or a buffer.
                const imageBlob = await removeBackground(inputPath);

                // Convert the Blob to a Buffer to save it.
                const imageBuffer = Buffer.from(await imageBlob.arrayBuffer());

                // Save the new image.
                await fs.writeFile(outputPath, imageBuffer);
                console.log(`  -> Saved to: ${outputPath}`);
            } catch (error) {
                console.error(`Failed to process ${file}:`, error);
            }
        }

        console.log('\nBackground removal process complete!');
    } catch (error) {
        console.error('An error occurred during the process:', error);
    }
}

processImages();
