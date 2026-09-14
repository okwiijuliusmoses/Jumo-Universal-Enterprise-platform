/**
 * JUMO UEOS
 * Registry Persistence Engine
 */

import fs from "fs";
import path from "path";

export class RegistryPersistenceEngine {

 constructor(){
   this.directory="platform/storage/snapshots";
 }

 save(name,data){

   const file =
   path.join(
    this.directory,
    `${name}.json`
   );

   fs.writeFileSync(
    file,
    JSON.stringify(data,null,2)
   );

   return file;
 }


 load(name){

   const file =
   path.join(
    this.directory,
    `${name}.json`
   );

   if(!fs.existsSync(file)){
    return [];
   }

   return JSON.parse(
    fs.readFileSync(file)
   );

 }

}

export const registryPersistenceEngine =
new RegistryPersistenceEngine();
