import React from 'react';
import { OrderManagerTable } from '../../components/admin/orders/OrderManagerTable';
import { useOrders } from '../../hooks/useOrders';

export const AdminOrdersPage: React.FC = () => {
  const { orders, refetch } = useOrders();
  return <OrderManagerTable orders={orders} onRefresh={refetch} onOpenVoucher={() => {}} />;
};
