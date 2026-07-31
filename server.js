import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { RuntimeManager } from "./kernel/runtime/runtimeManager.js";
import { ServiceRegistry } from "./kernel/registry/serviceRegistry.js";
import { EventBus } from "./kernel/events/eventBus.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const runtime = new RuntimeManager();
const registry = new ServiceRegistry();
const eventBus = new EventBus();

registry.register("eventBus", eventBus);

registry.register("Identity", {
  status: "active",
  version: "1.0.0",
  description: "Identity & Tenant Resolution Service"
});

registry.register("Workflow", {
  status: "active",
  version: "1.0.0",
  description: "Unified Workflow & Approval Engine"
});

registry.register("AIGateway", {
  status: "active",
  version: "1.0.0",
  description: "AI Model Abstraction & Request Router"
});

registry.register("FAAPFinance", {
  status: "active",
  version: "1.0.0",
  description: "FAAP Financial & Multi-Currency Ledger"
});

registry.register("AEGISAudit", {
  status: "active",
  version: "1.0.0",
  description: "AEGIS Immutable Accountability & Compliance Ledger"
});

registry.list().forEach(serviceName => {
  runtime.register(serviceName);
});

const runtimeState = runtime.start();

const PORT = process.env.PORT || 3000;

const server = http.createServer((req,res)=>{

  const url = new URL(req.url, `http://${req.headers.host}`);
  const pathname = url.pathname;

  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Methods","GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers","Content-Type");

  if(req.method==="OPTIONS"){
    res.writeHead(204);
    res.end();
    return;
  }


  if(pathname === "/health"){
    res.writeHead(200,{"Content-Type":"application/json"});
    res.end(JSON.stringify({
      status:"healthy",
      platform:"JUMO DIGITAL ENTERPRISE PLATFORM",
      system:"JUMO UEOS",
      runtime:runtimeState,
      servicesCount:registry.list().length,
      timestamp:new Date().toISOString()
    },null,2));
    return;
  }


  if(pathname === "/api/runtime"){
    res.writeHead(200,{"Content-Type":"application/json"});
    res.end(JSON.stringify({
      platformName:"JUMO DIGITAL ENTERPRISE PLATFORM",
      ueosVersion:"1.0.0-genesis",
      kernelStatus:runtimeState.status,
      runtimeDetails:runtimeState,
      registeredServices:registry.list(),
      availableExperienceModules:[
        "public-gateway",
        "identity-experience",
        "unified-workspace-shell"
      ]
    },null,2));
    return;
  }


  if(pathname === "/api/services"){
    const services={};

    registry.list().forEach(name=>{
      services[name]=registry.get(name);
    });

    res.writeHead(200,{"Content-Type":"application/json"});
    res.end(JSON.stringify({
      services
    },null,2));

    return;
  }


  if(
    pathname.endsWith(".js") ||
    pathname.endsWith(".css") ||
    pathname.startsWith("/experience/")
  ){

    let relativePath = pathname.substring(1);

    const filePath = path.join(__dirname,relativePath);

    fs.readFile(filePath,(err,data)=>{

      if(err){
        res.writeHead(404);
        res.end("Not Found");
        return;
      }

      const type =
        pathname.endsWith(".css")
        ? "text/css"
        : "application/javascript";

      res.writeHead(200,{
        "Content-Type":type
      });

      res.end(data);

    });

    return;
  }


  if(pathname === "/" || pathname.endsWith(".html")){

    const html =
      path.join(
        __dirname,
        "experience/gateway/index.html"
      );

    fs.readFile(html,(err,data)=>{

      if(err){
        res.writeHead(404);
        res.end("Gateway unavailable");
        return;
      }

      res.writeHead(200,{
        "Content-Type":"text/html"
      });

      res.end(data);

    });

    return;
  }


  res.writeHead(404,{
    "Content-Type":"application/json"
  });

  res.end(JSON.stringify({
    error:"Not Found"
  }));

});


server.listen(PORT,()=>{
 console.log(`JUMO UEOS Genesis Runtime running on port ${PORT}`);
});
