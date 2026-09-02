export class IdentityRuntime {
 constructor(){ this.status="ONLINE"; }
 health(){ return {runtime:"Identity Runtime",status:this.status}; }
}
export const identityRuntime = new IdentityRuntime();
