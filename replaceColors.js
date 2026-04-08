const fs = require('fs');
const path = require('path');

const directoryPaths = [
  path.join(__dirname, 'src', 'ui'),
  path.join(__dirname, 'src')
];

function replaceColorsInFile(filePath) {
  if (!filePath.endsWith('.tsx')) return;
  const content = fs.readFileSync(filePath, 'utf8');
  const updatedContent = content
    .replace(/cyan-400/g, 'theme-primary')
    .replace(/cyan-500/g, 'theme-primary')
    .replace(/magenta-400/g, 'theme-secondary')
    .replace(/magenta-500/g, 'theme-secondary')
    .replace(/magenta-900/g, 'theme-secondary')
    .replace(/bg-background/g, 'bg-theme-bg')
    .replace(/zinc-950/g, 'theme-bg')
    .replace(/bg-zinc-900/g, 'bg-surface-container-high'); // Just to genericize some dark colors slightly

  if (content !== updatedContent) {
    fs.writeFileSync(filePath, updatedContent);
    console.log(`Updated ${filePath}`);
  }
}

directoryPaths.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isFile()) {
      replaceColorsInFile(fullPath);
    }
  });
});

console.log("Done");
