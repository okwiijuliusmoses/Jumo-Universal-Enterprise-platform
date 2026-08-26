with open("server.ts", "r") as f:
    lines = f.readlines()
with open("server.ts", "w") as f:
    for line in lines:
        if "ReasoningProviderFactory.getInstance" in line or "ReasoningProviderFactory" in line:
            continue
        f.write(line)
