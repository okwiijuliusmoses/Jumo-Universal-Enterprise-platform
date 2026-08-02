export const workspaceTemplate = (state) => {
  initializeWorkspaceState(state);
  const logoHtml = getOfficialLogoHtml({ size: "sm", textColor: "dark" });
  
  // Resolve active template from runtime catalog
  const runtimeEngine = window.erpRuntimeEngine || state.runtimeEngine;
  const activeTemplate = state.session?.activeErpTemplate || (runtimeEngine ? runtimeEngine.getTemplate("edu-uni") : null);
  const activePortal = activeTemplate?.governancePortals?.find(p => p.id === state.activePortalId);
  // Auto-trigger auth check if navigating to a portal via URL
  if (activePortal && state.activePersona !== 'admin' && !state.portalAuths?.[activePortal.id]) {
    state.pendingPortalAuth = activePortal.id;
    state.activePortalId = null;
  }

  // Define Personas appropriate to this specific ERP
  const getContextPersonas = () => {
    if (!activeTemplate) return [];
    if (activeTemplate.id.startsWith('edu-')) {
      return [
        { code: 'admin', name: 'University Administrator / Provost', ring: 'Ring 0', authorizedPortals: ['council', 'academic', 'registrar', 'bursary', 'hr', 'exams', 'research', 'library', 'ict', 'procurement', 'hostels', 'medical', 'sacco', 'alumni'] },
        { code: 'lecturer', name: 'Faculty Professor / Lecturer', ring: 'Ring 1', authorizedPortals: ['academic', 'exams', 'research', 'library', 'sacco'] },
        { code: 'student', name: 'Active Student', ring: 'Ring 2', authorizedPortals: ['student', 'library', 'medical'] },
        { code: 'parent', name: 'Registered Parent / Guardian', ring: 'Ring 2', authorizedPortals: ['parent'] },
        { code: 'applicant', name: 'Public Applicant', ring: 'Ring 3', authorizedPortals: ['applicant'] }
      ];
    } else if (activeTemplate.id.startsWith('church-')) {
      return [
        { code: 'admin', name: 'Archbishop / Diocesan Bishop', ring: 'Ring 0', authorizedPortals: ['synod', 'archbishop', 'dioceses', 'missions', 'treasury', 'legal', 'sacco', 'media', 'youth'] },
        { code: 'priest', name: 'Parish Priest / Canon Lawyer', ring: 'Ring 1', authorizedPortals: ['pastor', 'council', 'worship', 'evangelism', 'member', 'sacco'] },
        { code: 'member', name: 'Congregation Member', ring: 'Ring 2', authorizedPortals: ['member', 'sacco'] }
      ];
    } else if (activeTemplate.id === 'standalone-legal') {
      return [
        { code: 'admin', name: 'Managing Partner', ring: 'Ring 0', authorizedPortals: ['partners', 'litigation', 'calendar', 'document', 'billing', 'client', 'hr', 'sacco'] },
        { code: 'associate', name: 'Senior Associate Counsel', ring: 'Ring 1', authorizedPortals: ['litigation', 'calendar', 'document', 'client', 'sacco'] },
        { code: 'client', name: 'Corporate Client', ring: 'Ring 2', authorizedPortals: ['client'] }
      ];
    } else {
      // Default fallback personas
      return [
        { code: 'admin', name: 'Executive Director / CEO', ring: 'Ring 0', authorizedPortals: ['board', 'exec', 'cabinet', 'treasury', 'sacco', 'procurement', 'audit'] },
        { code: 'staff', name: 'Senior Staff Officer', ring: 'Ring 1', authorizedPortals: ['service', 'crm', 'warehouse', 'sacco'] },
        { code: 'member', name: 'Sovereign Client / Member', ring: 'Ring 2', authorizedPortals: ['member', 'citizen'] }
      ];
    }
  };

  const personas = getContextPersonas();
  const activePersonaObj = personas.find(p => p.code === state.activePersona) || personas[0];

  // Helper to check if current persona can access a portal
  const isPortalAuthorized = (portalId) => {
    if (state.activePersona === 'admin') return true;
    if (state.portalAuths?.[portalId]) return true;
    return activePersonaObj?.authorizedPortals?.includes(portalId);
  };
