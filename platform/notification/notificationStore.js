/**
 * JMO UEOS DHP Phase-1
 * Enterprise Notification Storage
 */

const notifications = [];


function save(notification){

    notifications.push(notification);

    return notification;

}


function all(){

    return notifications;

}


module.exports = {

    save,

    all

};
