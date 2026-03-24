import { CUSTOMER_ID_HEADER } from '../../shared/headers/customer-id.constants';

export interface TenantContext {
  customerId: string;
}

export function createTenantContext(customerId: string): TenantContext {
  return {
    customerId,
  };
}

export function assertCustomerIdHeader(value: string | string[] | undefined): string {
  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Missing required header: ${CUSTOMER_ID_HEADER}`);
  }

  return value.trim();
}
