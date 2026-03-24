import { Injectable } from '@nestjs/common';

interface SiteSummary {
  id: string;
  customerId: string;
  code: string;
  name: string;
  timezone: string;
}

@Injectable()
export class SitesService {
  private readonly sites: SiteSummary[] = [
    {
      id: 'site-acme-hq',
      customerId: 'tenant-acme',
      code: 'HQ',
      name: 'Acme HQ Parking',
      timezone: 'Asia/Colombo',
    },
    {
      id: 'site-skyline-central',
      customerId: 'tenant-skyline',
      code: 'CENTRAL',
      name: 'Skyline Central Garage',
      timezone: 'Asia/Colombo',
    },
  ];

  listForCustomer(customerId: string): SiteSummary[] {
    return this.sites.filter((site) => site.customerId === customerId);
  }
}
