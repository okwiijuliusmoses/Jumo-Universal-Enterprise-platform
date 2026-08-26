
import { PortalGenerator, GeneratedPortalSuite } from "../PortalGenerator";

export class PortalDivision {
  static generate(name: string, country: string, portals: any[]): GeneratedPortalSuite {
    return PortalGenerator.generatePortalSuite(name, country, portals);
  }
}
