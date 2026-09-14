const fs = require('fs');
const path = require('path');

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        let fullPath = path.join(dir, file);
        if (fs.lstatSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (file.endsWith('.js')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            // Remove JS comments that are causing UI rendering corruption
            const newContent = content.replace(/\/\*[\s\S]*?\*\//g, '');
            if (content !== newContent) {
                fs.writeFileSync(fullPath, newContent);
                console.log('Fixed:', fullPath);
            }
        }
    });
}

walk('./experience');
