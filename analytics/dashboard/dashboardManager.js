const dashboards=[];


function createDashboard(name){

    dashboards.push({

        id:"DASH-"+Date.now(),

        name,

        widgets:[],

        status:"ACTIVE",

        createdAt:new Date()

    });

}


function addWidget(id,widget){

    const dashboard =
    dashboards.find(
        item=>item.id===id
    );


    if(dashboard){

        dashboard.widgets.push(widget);

    }

}


function list(){

    return dashboards;

}


module.exports={
    createDashboard,
    addWidget,
    list
};
