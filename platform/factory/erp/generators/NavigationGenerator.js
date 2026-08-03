export class NavigationGenerator {

generate(template){

return template.navigation || [];

}

}

export const navigationGenerator = new NavigationGenerator();
