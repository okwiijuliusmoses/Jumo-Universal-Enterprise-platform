import os
import re

def process_file(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r') as f:
        content = f.read()

    # Generic replace for localStorage.setItem and clear
    content = re.sub(r'(window\.)?localStorage\.setItem\((.*?)\);', r'try { \g<1>localStorage.setItem(\g<2>); } catch (e) {}', content)
    content = re.sub(r'(window\.)?localStorage\.clear\(\);', r'try { \g<1>localStorage.clear(); } catch (e) {}', content)

    with open(filepath, 'w') as f:
        f.write(content)

for root, _, files in os.walk('src'):
    for f in files:
        if f.endswith('.tsx') or f.endswith('.ts'):
            process_file(os.path.join(root, f))

