
import { SchemaGenerator, GeneratedDatabaseSchemaContract } from "../SchemaGenerator";

export class SchemaDivision {
  static generate(institutionId: string, modules: any[]): GeneratedDatabaseSchemaContract {
    return SchemaGenerator.generateSchema(institutionId, modules);
  }
}
