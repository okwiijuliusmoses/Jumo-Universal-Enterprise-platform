const metrics = [];

function record(metric) {
    metrics.push({
        ...metric,
        recordedAt: new Date()
    });

    return metric;
}

function getMetrics() {
    return metrics;
}

module.exports = {
    record,
    getMetrics
};
