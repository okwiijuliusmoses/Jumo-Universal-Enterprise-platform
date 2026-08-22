/**
 * JUMO UEOS Multi-Channel Notification Module
 */

export interface NotificationMessage {
  notificationId: string;
  recipient: string;
  channel: 'EMAIL' | 'WHATSAPP' | 'SMS' | 'IN_APP';
  title: string;
  body: string;
  tenantId: string;
  status: 'SENT' | 'QUEUED' | 'FAILED';
  timestamp: string;
}

export class NotificationEngine {
  private sentNotifications: NotificationMessage[] = [
    {
      notificationId: 'notif_001',
      recipient: 'info@jumo.ug.com',
      channel: 'EMAIL',
      title: 'UEOS System Alert: Treasury Buffer Nominal',
      body: 'Treasury Pool USD Americas operating at 82% liquidity capacity.',
      tenantId: 'tenant_owner_global',
      status: 'SENT',
      timestamp: new Date().toISOString(),
    },
    {
      notificationId: 'notif_002',
      recipient: '+256752964856',
      channel: 'WHATSAPP',
      title: 'FAAP Journal Posting Confirmed',
      body: 'Journal entry JE-2026-088 posted successfully for FinBank.',
      tenantId: 'tenant_finbank_01',
      status: 'SENT',
      timestamp: new Date().toISOString(),
    },
  ];

  public async sendNotification(
    params: Omit<NotificationMessage, 'notificationId' | 'status' | 'timestamp'>
  ): Promise<NotificationMessage> {
    const notif: NotificationMessage = {
      ...params,
      notificationId: `notif_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      status: 'SENT',
      timestamp: new Date().toISOString(),
    };
    this.sentNotifications.unshift(notif);
    return notif;
  }

  public getHistory(tenantId?: string): NotificationMessage[] {
    if (!tenantId) return this.sentNotifications;
    return this.sentNotifications.filter((n) => n.tenantId === tenantId || n.tenantId === 'tenant_owner_global');
  }
}

export const notificationEngine = new NotificationEngine();
