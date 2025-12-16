import { removeBackground } from '@imgly/background-removal-node';
import fs from 'fs/promises';
import path from 'path';

const inputPath = 'game_art_source/cloudlogo.png';
const outputPath = 'public/assets/cloudlogo.png';

async function fixLogo() {
    try {
        console.log(`Processing: ${inputPath}`);
        const imageBlob = await removeBackground(inputPath);
        const imageBuffer = Buffer.from(await imageBlob.arrayBuffer());
        await fs.writeFile(outputPath, imageBuffer);
        console.log(`  -> Saved to: ${outputPath}`);
    } catch (error) {
        console.error(`Failed to process logo:`, error);
    }
}

fixLogo();
