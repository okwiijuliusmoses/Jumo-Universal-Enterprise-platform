import re

with open('src/App.tsx', 'r') as f:
    content = f.read()

imports = """
import { NationalIdentityApplicationShell } from "./experience/renderer/shells/NationalIdentityApplicationShell";
import { NationalHealthApplicationShell } from "./experience/renderer/shells/NationalHealthApplicationShell";
import { NationalEducationApplicationShell } from "./experience/renderer/shells/NationalEducationApplicationShell";
"""

if "NationalIdentityApplicationShell" not in content:
    content = content.replace('import { FintechApplicationShell } from "./experience/renderer/shells/FintechApplicationShell";', imports.strip() + '\nimport { FintechApplicationShell } from "./experience/renderer/shells/FintechApplicationShell";')

routes = """
  if (path === "/identity") {
    return <NationalIdentityApplicationShell onBack={() => navigate("/")} />;
  }
  if (path === "/health") {
    return <NationalHealthApplicationShell onBack={() => navigate("/")} />;
  }
  if (path === "/education") {
    return <NationalEducationApplicationShell onBack={() => navigate("/")} />;
  }
"""

if "/identity" not in content:
    content = content.replace('if (path === "/fintech") {', routes.strip() + '\n  if (path === "/fintech") {')

with open('src/App.tsx', 'w') as f:
    f.write(content)

