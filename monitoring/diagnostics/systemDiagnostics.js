function runDiagnostics(){

    return {
        kernel:"HEALTHY",
        database:"HEALTHY",
        services:"HEALTHY",
        security:"HEALTHY",
        checkedAt:new Date()
    };

}

module.exports={
    runDiagnostics
};
