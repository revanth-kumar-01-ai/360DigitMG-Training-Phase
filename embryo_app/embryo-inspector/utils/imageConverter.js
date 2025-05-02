const fs = require('fs')
import path from 'path';


export const getBase64Image = (imagePath) => {
  try {
    const absolutePath = path.resolve(imagePath);
    const imageBuffer = fs.readFileSync(absolutePath);
    const base64String = imageBuffer.toString('base64');
    const mimeType = 'image/jpeg';
  
    return `data:${mimeType};base64,${base64String}`;
  } catch (error) {
    console.error('Error reading the image:', error);
    return null;
  }
};


