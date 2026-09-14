/**
 * JUMO UEOS
 * Control Center Module Registry
 */

import { renderNationalCommandView } from "./NationalCommandView.js";

export function renderControlCenterModules(){

 return `
 ${renderNationalCommandView()}
 `;

}
