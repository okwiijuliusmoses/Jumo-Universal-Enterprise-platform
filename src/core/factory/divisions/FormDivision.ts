
import { FormGenerator, GeneratedFormContract } from "../FormGenerator";

export class FormDivision {
  static generate(forms: any[]): GeneratedFormContract[] {
    return FormGenerator.generateForms(forms);
  }
}
