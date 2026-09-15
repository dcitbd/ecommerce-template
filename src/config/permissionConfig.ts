export const rolePermissionMap: Record<string, string[]> = {
  super_admin: ['*'],
  admin: [
    'products.*', 'orders.*', 'courier.*', 'fraud.*', 'reviews.*', 'banners.*', 'settings.*', 'reports.*'
  ],
  manager: [
    'products.view', 'orders.view', 'orders.edit', 'orders.status_update', 'returns.*', 'reviews.*', 'fraud.check'
  ],
  staff: [
    'orders.view', 'orders.status_update', 'courier.dispatch'
  ]
};
