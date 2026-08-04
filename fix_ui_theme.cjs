const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Replace dark mode classes with light enterprise classes
    content = content.replace(/bg-slate-900/g, 'bg-white');
    content = content.replace(/bg-slate-800/g, 'bg-slate-100');
    content = content.replace(/border-slate-800/g, 'border-slate-200');
    content = content.replace(/border-slate-700/g, 'border-slate-300');
    content = content.replace(/text-slate-300/g, 'text-slate-600');
    content = content.replace(/text-slate-400/g, 'text-slate-500');
    content = content.replace(/text-slate-200/g, 'text-slate-800');
    content = content.replace(/text-slate-100/g, 'text-slate-900');
    content = content.replace(/hover:bg-slate-800/g, 'hover:bg-slate-100');
    content = content.replace(/hover:bg-slate-700/g, 'hover:bg-slate-200');
    content = content.replace(/bg-slate-950/g, 'bg-slate-50');
    content = content.replace(/text-white/g, 'text-slate-800'); 
    
    // Some buttons need to remain distinct, but we'll stick to slate-800 text instead of white, or maybe use bg-slate-800 for buttons?
    // Let's refine button text:
    content = content.replace(/bg-white hover:bg-slate-100 text-slate-800/g, 'bg-slate-800 hover:bg-slate-700 text-white'); // invert buttons back if needed, actually let's leave it light enterprise.
    // Wait, the prompt says "light slate background, white workspace containers".
    // So bg-slate-50 or bg-slate-100 for the main background.
    content = content.replace(/min-h-screen bg-slate-900/g, 'min-h-screen bg-slate-50');
    content = content.replace(/min-h-screen bg-white/g, 'min-h-screen bg-slate-50');

    // Specific fix for "text-white" which we changed to "text-slate-800".
    // If it was a button with bg-white, it's fine.

    fs.writeFileSync(filePath, content);
}

function walk(dir) {
    fs.readdirSync(dir).forEach(file => {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            walk(fullPath);
        } else if (fullPath.endsWith('.js') || fullPath.endsWith('.html') || fullPath.endsWith('.tsx') || fullPath.endsWith('.jsx')) {
            replaceInFile(fullPath);
        }
    });
}

walk('experience');
walk('clean-clone/src');

console.log("UI Theme updated to Enterprise Light");
