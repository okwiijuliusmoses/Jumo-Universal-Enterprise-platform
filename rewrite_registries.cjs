const fs = require('fs');

let content = fs.readFileSync('src/products/registries.ts', 'utf8');

// I will just replace the whole file, it's easier to maintain and I can structure it well.
