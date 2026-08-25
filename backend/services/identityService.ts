export const identityService = {
  authenticate(email: string, pass: string) {
    if (email === 'owner@jumo.io' && pass === 'jumo123') {
      return { user: { email, role: 'OWNER', id: 'usr-001' }, token: 'jwt-owner' };
    }
    return { user: { email, role: 'TENANT', id: 'usr-002' }, token: 'jwt-tenant' };
  },
};
