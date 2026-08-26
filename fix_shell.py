import re

with open('src/experience/shell/UEOSShell.tsx', 'r') as f:
    content = f.read()

# Make sure imports are present
if "HeartPulse" not in content:
    content = content.replace("Zap, School, BookOpen, GraduationCap, Church, Users,", "Zap, School, BookOpen, GraduationCap, Church, Users, HeartPulse, Fingerprint,")

icon_logic = """
            if (manifest.productId === "prod-national-identity") {
              Icon = Fingerprint;
              color = "from-indigo-500 to-indigo-700";
              shadow = "shadow-indigo-500/20";
              path = "/identity";
            } else if (manifest.productId === "prod-national-health") {
              Icon = HeartPulse;
              color = "from-rose-500 to-rose-700";
              shadow = "shadow-rose-500/20";
              path = "/health";
            } else if (manifest.productId === "prod-national-education") {
              Icon = GraduationCap;
              color = "from-blue-500 to-blue-700";
              shadow = "shadow-blue-500/20";
              path = "/education";
            } else if (manifest.productId === "prod-faap-product") {
              Icon = DollarSign;
              color = "from-emerald-500 to-emerald-700";
              shadow = "shadow-emerald-500/20";
              path = "/faap";
            } else if (manifest.productId.includes("fintech")) {
"""

content = content.replace('if (manifest.productId.includes("fintech")) {', icon_logic.strip() + " ")

with open('src/experience/shell/UEOSShell.tsx', 'w') as f:
    f.write(content)

