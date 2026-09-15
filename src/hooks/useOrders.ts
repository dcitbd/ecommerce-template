import { useEffect, useState } from 'react';
import { OrderService } from '../services/orderService';
import { Order } from '../types/order';

export const useOrders = (userPhone?: string) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    setLoading(true);
    const data = userPhone ? await OrderService.getOrdersByPhone(userPhone) : await OrderService.getAllOrders();
    setOrders(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, [userPhone]);

  return { orders, loading, refetch: fetchOrders };
};
