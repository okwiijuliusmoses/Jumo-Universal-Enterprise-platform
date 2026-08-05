/**
 * JMO UEOS DHP Phase-1
 * Enterprise API Route Registry
 */

const routes = [];


function register(route){

    routes.push(route);

    return route;

}


function all(){

    return routes;

}


function find(path){

    return routes.find(
        route=>route.path===path
    );

}


module.exports = {

    register,

    all,

    find

};
