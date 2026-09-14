export class NavigationGenerator {

generate(){

return [
{
label:"Dashboard",
type:"workspace"
},
{
label:"Applications",
children:[
"Admissions",
"Recruitment",
"Membership",
"Service Requests"
]
},
{
label:"People",
children:[
"Students",
"Employees",
"Members",
"Alumni",
"Citizens"
]
},
{
label:"Institution",
children:[
"Departments",
"Organizations",
"Structures"
]
},
{
label:"Operations",
children:[
"Workflows",
"Approvals",
"Requests"
]
},
{
label:"Finance",
children:[
"Transactions",
"Budgets",
"Treasury"
]
},
{
label:"Documents",
children:[
"Records",
"Forms",
"Archives"
]
},
{
label:"Analytics",
children:[
"Reports",
"AI Insights",
"Dashboards"
]
},
{
label:"Administration",
children:[
"Roles",
"Permissions",
"Configuration"
]
}
];

}

}

export const navigationGenerator =
new NavigationGenerator();
