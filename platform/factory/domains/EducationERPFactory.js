import { DomainERPFactory } from "./DomainERPFactory.js";

export class EducationERPFactory extends DomainERPFactory {

 constructor(){

   super("Education");

 }

}


export const educationERPFactory =
new EducationERPFactory();
