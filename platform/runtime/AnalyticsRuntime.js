export class AnalyticsRuntime {

  constructor(){
    this.status="ONLINE";
  }

  health(){
    return {
      runtime:"Analytics Runtime",
      status:this.status
    };
  }

}

export const analyticsRuntime = new AnalyticsRuntime();
