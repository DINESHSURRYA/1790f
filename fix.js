const fs = require('fs');
const path = require('path');
const p = 'e:/c++/New folder/presentation-1790f/src/slides';
fs.readdirSync(p).forEach(f => {
    if (!f.endsWith('.jsx')) return;
    let c = fs.readFileSync(path.join(p, f), 'utf8');
    c = c.replace(/\\\`/g, '\`').replace(/\\\\\${/g, '\${');
    fs.writeFileSync(path.join(p, f), c);
});
console.log('Fixed JSX');
