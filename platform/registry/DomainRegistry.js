/**
 * JUMO UEOS
 * National Enterprise Domain Registry
 */

export class DomainRegistry {

  constructor(){

    this.status = "ONLINE";

    this.domains = [];

    this.registerDefaults();

  }


  register(domain){

    this.domains.push(domain);

    return domain;

  }


  registerDefaults(){

    const defaults = [

      {
        id:"government",
        name:"Government Enterprise Domain",
        category:"public-sector"
      },

      {
        id:"education",
        name:"Education Enterprise Domain",
        category:"institutional"
      },

      {
        id:"healthcare",
        name:"Healthcare Enterprise Domain",
        category:"institutional"
      },

      {
        id:"finance",
        name:"Financial Enterprise Domain",
        category:"financial"
      },

      {
        id:"agriculture",
        name:"Agriculture Enterprise Domain",
        category:"economic"
      },

      {
        id:"commerce",
        name:"Commerce Enterprise Domain",
        category:"business"
      },

      {
        id:"manufacturing",
        name:"Manufacturing Enterprise Domain",
        category:"industrial"
      },

      {
        id:"research",
        name:"Research & Innovation Domain",
        category:"knowledge"
      },

      {
        id:"ngo",
        name:"NGO & Development Domain",
        category:"social"
      },

      {
        id:"custom",
        name:"Custom Enterprise Domain",
        category:"configurable"
      }

    ];


    defaults.forEach(x=>this.register(x));

  }


  get(id){

    return this.domains.find(x=>x.id===id);

  }


  list(){

    return this.domains;

  }


  health(){

    return {

      registry:"UEOS Domain Registry",

      status:this.status,

      domains:this.domains.length

    };

  }

}


export const domainRegistry = new DomainRegistry();
