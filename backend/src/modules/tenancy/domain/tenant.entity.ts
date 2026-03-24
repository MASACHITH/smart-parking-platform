export interface TenantEntity {
  id: string;
  key: string;
  displayName: string;
  deploymentMode: 'saas' | 'on_prem';
  isActive: boolean;
}
