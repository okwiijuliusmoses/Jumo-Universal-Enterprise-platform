/**
 * JUMO UEOS
 * Server Configuration Registry
 */

export class ServerConfigurationRegistry {

 constructor(){
  this.servers=[];
 }

 register(server){

  const exists=this.servers.find(
   s=>s.id===server.id
  );

  if(exists){
   return exists;
  }

  this.servers.push({
   ...server,
   status:server.status || "ONLINE"
  });

  return server;
 }

 list(){
  return this.servers;
 }

 health(){
  return {
   registry:"UEOS Server Configuration Registry",
   servers:this.servers.length,
   status:"ONLINE"
  };
 }

}

export const serverConfigurationRegistry =
new ServerConfigurationRegistry();
