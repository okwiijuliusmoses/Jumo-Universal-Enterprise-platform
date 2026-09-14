export interface NavigationItem {
  id: string;
  label: string;
  code: string;
  iconName: string;
  portalId: string;
  moduleId: string;
}

export const CHERP_NAVIGATION: NavigationItem[] = [
  { id: 'nav-sacraments', label: 'Sacramental Registers & Parish Roll', code: 'CH-MOD-SACRAMENTS', iconName: 'Users', portalId: 'CH-PORTAL-PARISHIONER', moduleId: 'CH-MOD-SACRAMENTS' },
  { id: 'nav-tithe', label: 'Tithe & Sunday Offertory Collection', code: 'CH-MOD-TITHE-OFFERTORY', iconName: 'DollarSign', portalId: 'CH-PORTAL-TREASURY', moduleId: 'CH-MOD-TITHE-OFFERTORY' },
  { id: 'nav-pledges', label: 'Cathedral Building Campaign Pledges', code: 'CH-MOD-BUILDING-PLEDGES', iconName: 'Building2', portalId: 'CH-PORTAL-TREASURY', moduleId: 'CH-MOD-BUILDING-PLEDGES' },
  { id: 'nav-cells', label: 'Home Cell Fellowships & Discipleship', code: 'CH-MOD-CELL-FELLOWSHIPS', iconName: 'HeartHandshake', portalId: 'CH-PORTAL-PARISHIONER', moduleId: 'CH-MOD-CELL-FELLOWSHIPS' },
  { id: 'nav-counseling', label: 'Pastoral Counseling & Visitation', code: 'CH-MOD-PASTORAL-COUNSELING', iconName: 'Heart', portalId: 'CH-PORTAL-PARISHIONER', moduleId: 'CH-MOD-PASTORAL-COUNSELING' },
  { id: 'nav-benevolence', label: 'Benevolence Compassion Fund', code: 'CH-MOD-BENEVOLENCE-WELFARE', iconName: 'Milestone', portalId: 'CH-PORTAL-OUTREACH', moduleId: 'CH-MOD-BENEVOLENCE-WELFARE' },
  { id: 'nav-missions', label: 'Rural Evangelism & Church Planting', code: 'CH-MOD-RURAL-MISSIONS', iconName: 'Globe', portalId: 'CH-PORTAL-OUTREACH', moduleId: 'CH-MOD-RURAL-MISSIONS' },
  { id: 'nav-media', label: 'Sanctuary Livestream & Liturgy', code: 'CH-MOD-LIVESTREAM-MEDIA', iconName: 'Music', portalId: 'CH-PORTAL-MEDIA', moduleId: 'CH-MOD-LIVESTREAM-MEDIA' }
];
