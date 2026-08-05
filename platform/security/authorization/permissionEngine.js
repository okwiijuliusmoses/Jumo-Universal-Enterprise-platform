const permissions=[];


function registerPermission(permission){

    permissions.push({

        id:"PERM-"+Date.now(),
        name:permission,
        status:"ACTIVE"

    });

}


function listPermissions(){

    return permissions;

}


function check(permission){

    return permissions.some(
        item=>item.name===permission
    );

}


module.exports={
    registerPermission,
    listPermissions,
    check
};
