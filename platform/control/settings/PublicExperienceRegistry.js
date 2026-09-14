/**
 * JUMO UEOS
 * Public Experience Registry
 */

export class PublicExperienceRegistry {

 constructor(){
  this.content=[];
 }

 register(item){

  const exists=this.content.find(
   c=>c.id===item.id
  );

  if(exists){
   return exists;
  }

  this.content.push({
   ...item,
   status:"PUBLISHED"
  });

  return item;
 }

 list(){
  return this.content;
 }

 health(){
  return {
   registry:"UEOS Public Experience Registry",
   items:this.content.length,
   status:"ONLINE"
  };
 }

}

export const publicExperienceRegistry =
new PublicExperienceRegistry();
