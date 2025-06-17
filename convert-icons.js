import sharp from 'sharp';
import fs from 'fs';

async function convertSvgToPng() {
  try {
    // Convert 192x192 SVG to PNG
    await sharp('public/pwa-192x192.svg')
      .png()
      .toFile('public/pwa-192x192.png');
    
    // Convert 512x512 SVG to PNG  
    await sharp('public/pwa-512x512.svg')
      .png()
      .toFile('public/pwa-512x512.png');
      
    console.log('PWA icons converted successfully!');
  } catch (error) {
    console.error('Error converting icons:', error);
  }
}

convertSvgToPng();
