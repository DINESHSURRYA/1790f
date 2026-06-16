const fs = require('fs');
const path = require('path');

const slidesDir = 'e:/c++/New folder/presentation-1790f/src/slides';
const appPath = 'e:/c++/New folder/presentation-1790f/src/App.jsx';
const summaryPath = 'e:/c++/New folder/presentation-1790f/src/slides/SummarySlide.jsx';

// Fix SummarySlide.jsx text colors and inline code padding
let summary = fs.readFileSync(summaryPath, 'utf-8');
// Fix h4 text-[var(--text-muted)] -> text-[var(--text-color)]
summary = summary.replace(/<h4 className="font-bold text-\[var\(--text-muted\)\]">/g, '<h4 className="font-bold text-[var(--text-color)] text-xl mb-1">');
// Fix . Space: alignment
summary = summary.replace(/Time: <span className="font-mono text-\[var\(--text-color\)\]">([^<]+)<\/span>\. Space: <span className="font-mono text-\[var\(--text-color\)\]">([^<]+)<\/span>\./g, 
  'Time: <span className="font-mono px-2 py-0.5 mx-1 bg-[var(--border-color)] rounded text-[var(--text-color)]">$1</span> &nbsp;&nbsp;Space: <span className="font-mono px-2 py-0.5 mx-1 bg-[var(--border-color)] rounded text-[var(--text-color)]">$2</span>.');
fs.writeFileSync(summaryPath, summary, 'utf-8');

// Also fix . Space: or similar inline complexities in other slides
const files = fs.readdirSync(slidesDir);
files.forEach(file => {
  if (file.endsWith('.jsx')) {
    let p = path.join(slidesDir, file);
    let content = fs.readFileSync(p, 'utf-8');
    let changed = false;
    
    // Add padding to inline O(N) or O(N log N) if they are just spans
    if (content.includes('font-mono text-[var(--text-color)]') || content.includes('font-mono text-white')) {
      content = content.replace(/className="font-mono text-\[var\(--text-color\)\]"/g, 'className="font-mono px-1.5 py-0.5 mx-0.5 bg-[rgba(100,100,100,0.1)] rounded text-[var(--text-color)] font-bold"');
      content = content.replace(/className="font-mono text-white"/g, 'className="font-mono px-1.5 py-0.5 mx-0.5 bg-[rgba(100,100,100,0.1)] rounded text-[var(--text-color)] font-bold"');
      changed = true;
    }
    
    if (changed) {
      fs.writeFileSync(p, content, 'utf-8');
    }
  }
});

// Update App.jsx to remove filler slides
let app = fs.readFileSync(appPath, 'utf-8');
app = app.replace(/import DryRunSlide from '.\/slides\/DryRunSlide';\n/, '');
app = app.replace(/import InterviewSlide from '.\/slides\/InterviewSlide';\n/, '');
app = app.replace(/import EdgeCasesSlide from '.\/slides\/EdgeCasesSlide';\n/, '');
app = app.replace(/import Visual3DSlide from '.\/slides\/Visual3DSlide';\n/, '');

app = app.replace(/  DryRunSlide,\n/, '');
app = app.replace(/  InterviewSlide,\n/, '');
app = app.replace(/  EdgeCasesSlide,\n/, '');
app = app.replace(/  Visual3DSlide,\n/, '');
fs.writeFileSync(appPath, app, 'utf-8');

console.log('Cleanup complete');
