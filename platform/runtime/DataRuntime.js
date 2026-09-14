export class DataRuntime {
 constructor(){ this.status="ONLINE"; }
 health(){ return {runtime:"Data Runtime",status:this.status}; }
}
export const dataRuntime = new DataRuntime();
