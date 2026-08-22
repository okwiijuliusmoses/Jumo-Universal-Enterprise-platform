const alerts = [];

function createAlert(type, message) {

    const alert = {
        id: "ALT-" + Date.now(),
        type,
        message,
        status:"OPEN",
        createdAt:new Date()
    };

    alerts.push(alert);

    return alert;
}

function getAlerts(){
    return alerts;
}

module.exports={
    createAlert,
    getAlerts
};
