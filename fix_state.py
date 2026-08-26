with open("src/core/runtime/sovereignState.ts", "r") as f:
    content = f.read()

content = content.replace('import fs from "fs";', '')
content = content.replace('import path from "path";', '''
const isBrowser = typeof window !== "undefined";
let nodeFs: any = null;
let nodePath: any = null;
if (!isBrowser) {
  try {
    nodeFs = eval('require("fs")');
    nodePath = eval('require("path")');
  } catch(e) {}
}
''')
content = content.replace('const STATE_FILE_PATH = path.join(process.cwd(), "sovereign-state.json");', '''
const STATE_FILE_PATH = (!isBrowser && nodePath && typeof process !== "undefined" && typeof process.cwd === "function") 
  ? nodePath.join(process.cwd(), "sovereign-state.json") 
  : "sovereign-state.json";
''')
content = content.replace('fs.existsSync', 'nodeFs?.existsSync')
content = content.replace('fs.readFileSync', 'nodeFs?.readFileSync')
content = content.replace('fs.writeFileSync', 'nodeFs?.writeFileSync')

with open("src/core/runtime/sovereignState.ts", "w") as f:
    f.write(content)
