/**
 * JUMO UEOS
 * Digital Office Form Registry
 */

export class FormRegistry {

 constructor(){
   this.status="ONLINE";
   this.forms=[];
 }

 register(form){
   this.forms.push(form);
   return form;
 }

 list(){
   return this.forms;
 }

 health(){
   return {
    registry:"JUMO Form Registry",
    status:this.status,
    forms:this.forms.length
   };
 }

}

export const formRegistry = new FormRegistry();
