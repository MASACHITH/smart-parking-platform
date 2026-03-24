import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { SitesService } from './sites.service';
import type { AuthenticatedRequest } from '../../shared/request/authenticated-request';

@Controller('sites')
export class SitesController {
  constructor(private readonly sitesService: SitesService) {}

  @Get()
  @UseGuards(AuthGuard)
  listSites(@Req() request: AuthenticatedRequest): unknown {
    const customerId = request.tenantContext?.customerId;

    return {
      items: this.sitesService.listForCustomer(customerId ?? ''),
    };
  }
}
