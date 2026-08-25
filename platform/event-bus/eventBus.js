/**
 * JMO UEOS DHP Phase-1
 * Enterprise Event Bus
 */

const store =
require("./eventStore");


const listeners = {};


function emit(type,payload){

    const event = {

        id:"EVT-"+Date.now(),

        type,

        payload,

        createdAt:new Date()

    };


    store.publish(event);


    if(listeners[type]){

        listeners[type]
        .forEach(handler =>
            handler(event)
        );

    }


    return event;

}


function subscribe(type,handler){

    if(!listeners[type]){

        listeners[type]=[];

    }


    listeners[type].push(handler);

}


function history(){

    return store.all();

}


module.exports = {

    emit,

    subscribe,

    history

};
