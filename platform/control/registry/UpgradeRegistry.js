/**
 * JUMO UEOS
 * Upgrade & Release Registry
 */

export class UpgradeRegistry {

constructor(){

 this.status="ONLINE";
 this.releases=[];

}


register(release){

 const record={
  ...release,
  status:"DRAFT",
  createdAt:new Date().toISOString()
 };

 this.releases.push(record);

 return record;

}


changeStatus(id,status){

 const release=this.releases.find(
  r=>r.id===id
 );

 if(release){
  release.status=status;
 }

 return release;

}


list(){

 return this.releases;

}


health(){

 return {
  registry:"UEOS Upgrade Registry",
  status:this.status,
  releases:this.releases.length
 };

}

}


export const upgradeRegistry =
new UpgradeRegistry();
