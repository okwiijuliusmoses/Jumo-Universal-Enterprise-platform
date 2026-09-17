/**
 * JUMO UEOS
 * Enterprise Approval Registry
 */

export class ApprovalRegistry {

constructor(){

 this.status="ONLINE";
 this.requests=[];

}


create(request){

 const approval={
  ...request,
  status:"PENDING",
  createdAt:new Date().toISOString()
 };

 this.requests.push(approval);

 return approval;

}


approve(id){

 const item=this.requests.find(
  r=>r.id===id
 );

 if(item){
  item.status="APPROVED";
 }

 return item;

}


list(){

 return this.requests;

}


health(){

 return {
  registry:"UEOS Approval Registry",
  status:this.status,
  approvals:this.requests.length
 };

}

}


export const approvalRegistry =
new ApprovalRegistry();
