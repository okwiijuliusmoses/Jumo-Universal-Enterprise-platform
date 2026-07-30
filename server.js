import http from "http";
import { RuntimeManager } from "./kernel/runtime/runtimeManager.js";
import { ServiceRegistry } from "./kernel/registry/serviceRegistry.js";
import { EventBus } from "./kernel/events/eventBus.js";

const runtime = new RuntimeManager();
const registry = new ServiceRegistry();
const eventBus = new EventBus();

registry.register("eventBus", eventBus);
runtime.register("UEOS Kernel");

const PORT = process.env.PORT || 3000;

const server = http.createServer((req,res)=>{

  if(req.url === "/health"){

    res.writeHead(200,{
      "Content-Type":"application/json"
    });

    res.end(JSON.stringify({
      platform:"JUMO DIGITAL ENTERPRISE PLATFORM",
      system:"JUMO UEOS",
      runtime:runtime.start(),
      services:registry.list()
    }));

    return;
  }

  res.writeHead(200,{
    "Content-Type":"application/json"
  });

  res.end(JSON.stringify({
    message:"JUMO UEOS Genesis Runtime"
  }));

});


server.listen(PORT,()=>{
 console.log(
  `JUMO UEOS running on port ${PORT}`
 );
});
