export class FinancialRuntime {
 constructor(){ this.status="ONLINE"; }
 health(){ return {runtime:"Financial Runtime",status:this.status}; }
}
export const financialRuntime = new FinancialRuntime();
