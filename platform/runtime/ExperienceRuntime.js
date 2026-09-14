export class ExperienceRuntime {
 constructor(){ this.status="ONLINE"; }
 health(){ return {runtime:"Experience Runtime",status:this.status}; }
}
export const experienceRuntime = new ExperienceRuntime();
