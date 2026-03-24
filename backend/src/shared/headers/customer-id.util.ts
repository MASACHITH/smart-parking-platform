import { CUSTOMER_ID_HEADER } from './customer-id.constants';

export function getCustomerIdHeaderDescription(): string {
  return `Every tenant-scoped request must include the ${CUSTOMER_ID_HEADER} header.`;
}
