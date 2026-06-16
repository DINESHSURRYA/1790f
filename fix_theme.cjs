const fs = require('fs');
const path = require('path');

const slidesDir = 'e:/c++/New folder/presentation-1790f/src/slides';
const files = fs.readdirSync(slidesDir);

files.forEach(file => {
  if (file.endsWith('.jsx')) {
    const filePath = path.join(slidesDir, file);
    let content = fs.readFileSync(filePath, 'utf-8');

    content = content.replace(/text-gray-[1-6]00/g, 'text-[var(--text-muted)]');
    content = content.replace(/text-white/g, 'text-[var(--text-color)]');
    
    content = content.replace(/border-gray-[7-9]00/g, 'border-[color:var(--border-color)]');
    
    content = content.replace(/bg-black\/40/g, 'bg-[var(--card-bg)]');
    content = content.replace(/bg-\[rgba\(0,0,0,0\.5\)\]/g, 'bg-[var(--card-bg)]');

    fs.writeFileSync(filePath, content, 'utf-8');
  }
});

// Also check App.jsx
const appPath = 'e:/c++/New folder/presentation-1790f/src/App.jsx';
let appContent = fs.readFileSync(appPath, 'utf-8');
appContent = appContent.replace(/text-gray-[1-6]00/g, 'text-[var(--text-muted)]');
appContent = appContent.replace(/text-muted/g, 'text-[var(--text-muted)]'); // If someone manually typed text-muted as a class
fs.writeFileSync(appPath, appContent, 'utf-8');

console.log('Fixed text colors in slides!');
