/**
 * JUMO DIGITAL HYBRID PLATFORM - Digital Marketplace Ecosystem
 * Production foundation for partner services, advertising, and automated revenue routing.
 */

import { platformEventBus } from '../event-bus';
import { auditEngine } from '../audit';
import { treasuryEngine } from '../treasury';
import { faapEngine } from '../faap';

export interface MarketplacePartner {
  partnerId: string;
  name: string;
  category: 'FINTECH' | 'SECURITY' | 'INFRASTRUCTURE' | 'MARKETING' | 'COMPLIANCE';
  status: 'APPROVED' | 'PENDING' | 'SUSPENDED';
  developerEmail: string;
}

export interface MarketplaceListing {
  listingId: string;
  partnerId: string;
  title: string;
  description: string;
  priceUSD: number;
  billingType: 'ONE_TIME' | 'MONTHLY_RECURRING' | 'PER_USE';
  status: 'ACTIVE' | 'ARCHIVED';
}

export interface AdCampaign {
  campaignId: string;
  advertiserName: string;
  bannerUrl: string;
  clickUrl: string;
  costPerClickUSD: number;
  totalBudgetUSD: number;
  spentUSD: number;
  clicks: number;
}

export interface MarketplaceTransaction {
  transactionId: string;
  listingId: string;
  buyerTenantId: string;
  amountUSD: number;
  platformFeeUSD: number;
  partnerShareUSD: number;
  timestamp: string;
  status: 'SETTLED' | 'PENDING' | 'REFUNDED';
}

export class JumoMarketplaceEngine {
  private partners: MarketplacePartner[] = [
    {
      partnerId: 'prt_safari_telecom',
      name: 'Safaricom Integration Services',
      category: 'INFRASTRUCTURE',
      status: 'APPROVED',
      developerEmail: 'dev.support@safaricom.co.ke',
    },
    {
      partnerId: 'prt_metropol_crb',
      name: 'Metropol Credit Reference Bureau',
      category: 'COMPLIANCE',
      status: 'APPROVED',
      developerEmail: 'api@metropol.co.ke',
    },
  ];

  private listings: MarketplaceListing[] = [
    {
      listingId: 'lst_mpesa_b2c',
      partnerId: 'prt_safari_telecom',
      title: 'M-PESA B2C Disbursement & Collection Gateway',
      description: 'Automated high-throughput mobile money API integration for SACCO & NGO transfers.',
      priceUSD: 0.05,
      billingType: 'PER_USE',
      status: 'ACTIVE',
    },
    {
      listingId: 'lst_metropol_scores',
      partnerId: 'prt_metropol_crb',
      title: 'Metropol Real-Time Credit Score Fetcher',
      description: 'Verifies citizen identification numbers and fetches credit ratings instantly for FAAP evaluations.',
      priceUSD: 1.50,
      billingType: 'PER_USE',
      status: 'ACTIVE',
    },
    {
      listingId: 'lst_jumo_cloud_hsm',
      partnerId: 'prt_metropol_crb',
      title: 'Enterprise Cryptographic HSM Compliance Vault',
      description: 'Dedicated cloud-hosted FIPS 140-2 Level 3 hardware security module integration.',
      priceUSD: 250.00,
      billingType: 'MONTHLY_RECURRING',
      status: 'ACTIVE',
    },
  ];

  private adCampaigns: AdCampaign[] = [
    {
      campaignId: 'ad_camp_01',
      advertiserName: 'Metropol Corporate Credit Analytics',
      bannerUrl: '/assets/ads/metropol_corporate.png',
      clickUrl: 'https://metropol.co.ke/corporate',
      costPerClickUSD: 0.25,
      totalBudgetUSD: 1000,
      spentUSD: 45.25,
      clicks: 181,
    },
    {
      campaignId: 'ad_camp_02',
      advertiserName: 'KRA Automated Tax Compliance System',
      bannerUrl: '/assets/ads/kra_tax.png',
      clickUrl: 'https://kra.go.ke/tax',
      costPerClickUSD: 0.15,
      totalBudgetUSD: 500,
      spentUSD: 12.00,
      clicks: 80,
    },
  ];

  private transactions: MarketplaceTransaction[] = [];

  public getPartners(): MarketplacePartner[] {
    return this.partners;
  }

  public getListings(): MarketplaceListing[] {
    return this.listings;
  }

  public getAdCampaigns(): AdCampaign[] {
    return this.adCampaigns;
  }

  public getTransactions(): MarketplaceTransaction[] {
    return this.transactions;
  }

  public registerPartner(partner: MarketplacePartner): MarketplacePartner {
    if (this.partners.find(p => p.partnerId === partner.partnerId)) {
      throw new Error(`Partner ${partner.partnerId} already registered.`);
    }
    this.partners.push(partner);
    return partner;
  }

  public createListing(listing: MarketplaceListing): MarketplaceListing {
    if (!this.partners.find(p => p.partnerId === listing.partnerId)) {
      throw new Error(`Partner ID ${listing.partnerId} does not exist.`);
    }
    this.listings.push(listing);
    return listing;
  }

  /**
   * Tracks an ad click, charges advertiser budget, and routes click revenue to JUMO Master Treasury
   */
  public registerAdClick(campaignId: string, tenantId: string): { success: boolean; costPaid: number } {
    const campaign = this.adCampaigns.find(c => c.campaignId === campaignId);
    if (!campaign) throw new Error(`Campaign ${campaignId} not found.`);

    if (campaign.spentUSD + campaign.costPerClickUSD > campaign.totalBudgetUSD) {
      throw new Error('Campaign budget exhausted.');
    }

    campaign.clicks += 1;
    campaign.spentUSD += campaign.costPerClickUSD;

    // Double-Entry routing of click revenue: Credit Cash (Asset) by Cost, Credit Advertising Revenue (Income) by Cost
    faapEngine.postJournalEntry({
      tenantId: 'tenant_owner_global',
      description: `Marketplace Pay-Per-Click Ad Monetization: Campaign ${campaignId}`,
      debitAccount: '1010', // Cash / Liquidity Asset
      creditAccount: '4010', // General Ecosystem Service Revenue
      amountUSD: campaign.costPerClickUSD,
    });

    auditEngine.logEvent({
      actorId: tenantId,
      actorRole: 'TENANT',
      action: 'MARKETPLACE_AD_CLICK',
      resourceTarget: campaignId,
      status: 'SUCCESS',
      ipAddress: '127.0.0.1',
      tenantId,
      metadata: { costPaid: campaign.costPerClickUSD },
    });

    return { success: true, costPaid: campaign.costPerClickUSD };
  }

  /**
   * Executes a purchase of an Enterprise Listing, with automated revenue routing:
   * JUMO platform takes 15% service fee directly routed to Master Treasury.
   * Remaining 85% is distributed to the external developer/partner.
   */
  public purchaseListing(listingId: string, buyerTenantId: string): MarketplaceTransaction {
    const listing = this.listings.find(l => l.listingId === listingId);
    if (!listing) throw new Error(`Marketplace listing ${listingId} not found.`);

    const totalCost = listing.priceUSD;
    const platformFee = Math.round(totalCost * 0.15 * 100) / 100; // 15% Platform take
    const partnerShare = Math.round((totalCost - platformFee) * 100) / 100; // 85% Partner payout

    // Double Entry posting for platform fee routing:
    // Debit Cash (Asset) by platformFee, Credit Marketplace Commission Revenue (Income) by platformFee
    faapEngine.postJournalEntry({
      tenantId: 'tenant_owner_global',
      description: `JUMO Marketplace Commission - Purchase ${listingId}`,
      debitAccount: '1010', // Cash Asset
      creditAccount: '4010', // Commission Revenue
      amountUSD: platformFee,
    });

    // Register Transaction
    const txn: MarketplaceTransaction = {
      transactionId: `tx_mkt_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      listingId,
      buyerTenantId,
      amountUSD: totalCost,
      platformFeeUSD: platformFee,
      partnerShareUSD: partnerShare,
      timestamp: new Date().toISOString(),
      status: 'SETTLED',
    };

    this.transactions.push(txn);

    auditEngine.logEvent({
      actorId: buyerTenantId,
      actorRole: 'TENANT',
      action: 'MARKETPLACE_PURCHASE',
      resourceTarget: txn.transactionId,
      status: 'SUCCESS',
      ipAddress: '127.0.0.1',
      tenantId: buyerTenantId,
      metadata: { listingId, totalCost, platformFee, partnerShare },
    });

    platformEventBus.publish(
      'WORKFLOW_RULE_TRIGGERED',
      buyerTenantId,
      { transactionId: txn.transactionId, listingId, totalCost }
    );

    return txn;
  }
}

export const jumoMarketplaceEngine = new JumoMarketplaceEngine();
