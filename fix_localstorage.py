import os
import re

def safe_storage(match):
    return f"""(() => {{
  try {{
    return {match.group(0)};
  }} catch (e) {{
    return null;
  }}
}})()"""

def process_file(filepath):
    if not os.path.exists(filepath): return
    with open(filepath, 'r') as f:
        content = f.read()
    
    # Simple patches for common patterns
    if 'localStorage.getItem("ueos_user")' in content:
        content = content.replace('const stored = localStorage.getItem("ueos_user");', 
        '''let stored = null;
      try { stored = localStorage.getItem("ueos_user"); } catch (e) {}''')
    
    if 'localStorage.setItem("ueos_user"' in content:
        content = content.replace('localStorage.setItem("ueos_user", JSON.stringify(user));',
        'try { localStorage.setItem("ueos_user", JSON.stringify(user)); } catch (e) {}')
    
    if 'localStorage.removeItem("ueos_user")' in content:
        content = content.replace('localStorage.removeItem("ueos_user");',
        'try { localStorage.removeItem("ueos_user"); } catch (e) {}')

    # UEOSShell.tsx
    if 'localStorage.getItem("jumo_ueos_active_workspace")' in content:
        content = content.replace('const saved = localStorage.getItem("jumo_ueos_active_workspace");',
        '''let saved = null;
    try { saved = localStorage.getItem("jumo_ueos_active_workspace"); } catch(e) {}''')
    
    if 'localStorage.getItem("ueos_sidebar_collapsed")' in content:
        content = content.replace('return localStorage.getItem("ueos_sidebar_collapsed") === "true";',
        '''try { return localStorage.getItem("ueos_sidebar_collapsed") === "true"; } catch(e) { return false; }''')
    
    if 'localStorage.getItem("jumo_ueos_settings_v1")' in content:
        content = content.replace('const saved = localStorage.getItem("jumo_ueos_settings_v1");',
        '''let saved = null;
    try { saved = localStorage.getItem("jumo_ueos_settings_v1"); } catch(e) {}''')
    
    if 'localStorage.setItem("jumo_ueos_active_workspace"' in content:
        content = content.replace('localStorage.setItem("jumo_ueos_active_workspace", tab);',
        'try { localStorage.setItem("jumo_ueos_active_workspace", tab); } catch(e) {}')
        
    if 'localStorage.setItem("ueos_sidebar_collapsed"' in content:
        content = content.replace('localStorage.setItem("ueos_sidebar_collapsed", String(val));',
        'try { localStorage.setItem("ueos_sidebar_collapsed", String(val)); } catch(e) {}')
        
    if 'localStorage.setItem("jumo_ueos_settings_v1"' in content:
        content = content.replace('localStorage.setItem("jumo_ueos_settings_v1", JSON.stringify(next));',
        'try { localStorage.setItem("jumo_ueos_settings_v1", JSON.stringify(next)); } catch(e) {}')
        
    # api.ts
    if 'localStorage.getItem("JUMO_SESSION")' in content:
        content = content.replace('(localStorage.getItem("JUMO_SESSION") || localStorage.getItem("jumo_session_token"))',
        '(() => { try { return localStorage.getItem("JUMO_SESSION") || localStorage.getItem("jumo_session_token"); } catch(e) { return null; } })()')

    # FAAPRenderer.tsx
    if 'window.localStorage.getItem("faap-offline-queue")' in content:
        content = content.replace('window.localStorage.getItem("faap-offline-queue") || "0"',
        '(() => { try { return window.localStorage.getItem("faap-offline-queue") || "0"; } catch(e) { return "0"; } })()')
        
    if 'window.localStorage.setItem("faap-offline-queue"' in content:
        content = content.replace('window.localStorage.setItem("faap-offline-queue", (offlineQueue + 1).toString());',
        'try { window.localStorage.setItem("faap-offline-queue", (offlineQueue + 1).toString()); } catch(e) {}')
        
    # db.ts
    if 'localStorage.getItem("ueos_db_backup")' in content:
        content = content.replace('const stored = localStorage.getItem("ueos_db_backup");',
        '''let stored = null;
        try { stored = localStorage.getItem("ueos_db_backup"); } catch(e) {}''')
    
    if 'localStorage.setItem("ueos_db_backup"' in content:
        content = content.replace('localStorage.setItem("ueos_db_backup", JSON.stringify(this.data));',
        'try { localStorage.setItem("ueos_db_backup", JSON.stringify(this.data)); } catch(e) {}')

    with open(filepath, 'w') as f:
        f.write(content)

process_file("src/App.tsx")
process_file("src/experience/shell/UEOSShell.tsx")
process_file("src/experience/shell/UEOSSettingsCenter.tsx")
process_file("src/core/config/api.ts")
process_file("src/experience/renderer/FAAPRenderer.tsx")
process_file("src/database/db.ts")
