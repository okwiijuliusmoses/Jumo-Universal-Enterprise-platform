
const domains=[

"alumni",

"church",

"education",

"enterprise",

"ngo",

"professional-services",

"jumo-aegis-ai"

];


function loadDomains(){

return domains.map(domain=>({

domain,

status:"REGISTERED"

}));

}


module.exports={

loadDomains

};

