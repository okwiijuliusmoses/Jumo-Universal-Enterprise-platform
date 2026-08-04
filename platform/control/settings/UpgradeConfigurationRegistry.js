/**
 * JUMO UEOS
 * Upgrade Configuration Registry
 */

export class UpgradeConfigurationRegistry {

 constructor(){
  this.upgrades=[];
 }

 register(upgrade){

  const exists=this.upgrades.find(
   u=>u.id===upgrade.id
  );

  if(exists){
   return exists;
  }

  this.upgrades.push({
   ...upgrade,
   status:"AVAILABLE"
  });

  return upgrade;
 }

 list(){
  return this.upgrades;
 }

 health(){
  return {
   registry:"UEOS Upgrade Configuration Registry",
   upgrades:this.upgrades.length,
   status:"ONLINE"
  };
 }

}

export const upgradeConfigurationRegistry =
new UpgradeConfigurationRegistry();
