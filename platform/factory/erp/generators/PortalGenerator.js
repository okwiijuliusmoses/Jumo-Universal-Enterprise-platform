export class PortalGenerator {

generate(template){

return template.portals || [];

}

}

export const portalGenerator = new PortalGenerator();
