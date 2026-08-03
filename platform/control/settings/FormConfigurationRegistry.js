/**
 * JUMO UEOS
 * Form Configuration Registry
 */

export class FormConfigurationRegistry {

 constructor(){
  this.forms=[];
 }

 register(form){

  const exists=this.forms.find(
   f=>f.id===form.id
  );

  if(exists){
   return exists;
  }

  this.forms.push({
   ...form,
   status:"ACTIVE"
  });

  return form;
 }

 list(){
  return this.forms;
 }

 health(){
  return {
   registry:"UEOS Form Configuration Registry",
   forms:this.forms.length,
   status:"ONLINE"
  };
 }

}

export const formConfigurationRegistry =
new FormConfigurationRegistry();
