/**
 * JUMO UEOS
 * Layer Configuration Registry
 */

export class LayerConfigurationRegistry {

 constructor(){
  this.layers=[];
 }

 register(layer){

  const exists=this.layers.find(
   l=>l.id===layer.id
  );

  if(exists){
   return exists;
  }

  this.layers.push({
   ...layer,
   status:"ACTIVE"
  });

  return layer;
 }

 list(){
  return this.layers;
 }

 health(){
  return {
   registry:"UEOS Layer Configuration Registry",
   layers:this.layers.length,
   status:"ONLINE"
  };
 }

}

export const layerConfigurationRegistry =
new LayerConfigurationRegistry();
