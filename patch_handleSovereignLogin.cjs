const fs = require('fs');
let content = fs.readFileSync('experience/gateway/app.js', 'utf8');

const sovereignLogin = `
window.handleSovereignLogin = async function(e, redirectRoute = '/control-center') {
  e.preventDefault();
  
  const emailInput = document.getElementById("sov-email") || document.getElementById("login-email") || { value: "owner@jumo.enterprise" };
  const email = emailInput.value || "owner@jumo.enterprise";
  
  try {
    // Phase 1 - Authentication Validation (Simulated for frontend)
    // Send request through services/identity/identityGateway.js
    
    // Simulate successful authentication and set UEOS session
    window.state.session = {
      user: {
        name: email.split("@")[0].replace(".", " "),
        email: email,
        role: "Platform Owner",
        isAdmin: true,
        status: "Sovereign Administrator"
      },
      organization: "JUMO GLOBAL PLATFORM HQ",
      tenantId: "tenant-sovereign-000"
    };
    
    if (!window.state.bootStatus) window.state.bootStatus = [];
    if (!window.state.bootStatus.includes("Sovereign Identity Validated")) {
      window.state.bootStatus.push("Sovereign Identity Validated");
    }
    
    // Redirect to Control Center workspace
    window.navigate(redirectRoute);
    
  } catch (error) {
    console.error("[UEOS] Sovereign Authentication Failed", error);
    alert("Authentication failed. Verify credentials and permissions.");
  }
};
`;

content = content.replace(
  'window.handleLoginSubmit = function(e) {',
  sovereignLogin + '\nwindow.handleLoginSubmit = function(e) {'
);

fs.writeFileSync('experience/gateway/app.js', content);
