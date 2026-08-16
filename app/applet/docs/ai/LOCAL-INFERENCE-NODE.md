# JUMO UEOS — Local Inference Node Deployment Guide

This document specifies the operational requirements and architectural setup for deploying and running a sovereign local AI inference node (Ollama, vLLM, llama.cpp, or LocalAI) to power JUMO UEOS in air-gapped or hybrid sovereign mode.

---

## 1. Overview & Architecture

JUMO UEOS provides a decoupled, secure AI Provider Fabric (`JumoAIProviderFabricRegistry`, `LocalInferenceRuntimeRegistry`) that interfaces with local inference nodes over secure HTTP endpoints (`http://127.0.0.1:11434` for Ollama, `http://127.0.0.1:8000` for vLLM, etc.).

The JUMO application itself runs either as a cloud container or on-premises server, while the inference node runs on a dedicated host equipped with CPU/GPU acceleration.

```
[Dedicated Host / GPU Node]
  ├── Ollama Daemon (Port 11434)
  │     └── Model (e.g. qwen2.5:7b, llama3)
  │
  ▲ (HTTP / JSON-RPC / REST)
  │
[JUMO UEOS Runtime / AI Gateway]
  ├── LocalInferenceRuntimeRegistry
  └── JUMO AI Provider Fabric
```

---

## 2. Installing Ollama (Recommended Local Runtime)

On your designated local inference host (Linux, macOS, or Windows WSL2):

### Step 1: Install Ollama
```bash
curl -fsSL https://ollama.com/install.sh | sh
```

### Step 2: Start the Ollama Daemon
```bash
ollama serve
```
Verify that the service is running and listening on port `11434`:
```bash
curl http://127.0.0.1:11434/api/tags
```

### Step 3: Pull an Approved Local Model
Download an approved instruct or reasoning model compatible with your available RAM/VRAM:
```bash
# Recommended 7B model (requires ~8GB RAM/VRAM)
ollama pull qwen2.5:7b

# Lightweight fallback model (requires ~4GB RAM/VRAM)
ollama pull qwen2.5:3b
```
Verify the installation:
```bash
ollama list
```

---

## 3. Configuring JUMO UEOS for Local Inference

Configure the server-side environment variables in your production `.env` file (never commit secrets to version control):

```env
# AI Provider Mode: 'air-gap', 'hybrid', or 'cloud'
AI_PROVIDER_MODE=hybrid

# Local Inference Runtime Configuration
JUMO_LOCAL_RUNTIME_ENABLED=true
JUMO_LOCAL_RUNTIME_TYPE=ollama
JUMO_LOCAL_OLLAMA_URL=http://127.0.0.1:11434
JUMO_LOCAL_MODEL=qwen2.5:7b
JUMO_LOCAL_MODEL_FALLBACK=qwen2.5:3b

# External Cloud Provider Credentials (Server-side Secret Vault)
OPENAI_API_KEY=
GEMINI_API_KEY=
```

---

## 4. Firewall & Network Security

- **Air-Gapped Mode**: When `AI_PROVIDER_MODE=air-gap`, external network routing is disabled at the gateway layer. All reasoning requests are routed exclusively to `JUMO_LOCAL`.
- **Network Isolation**: Ensure port `11434` is restricted to local loopback (`127.0.0.1`) or a secure private VLAN between the JUMO gateway and the AI inference node. Do not expose unauthenticated inference ports to the public internet.
