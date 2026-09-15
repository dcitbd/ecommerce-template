import { useEffect, useState } from 'react';
import { CustomerService } from '../services/customerService';
import { CustomerRecord } from '../types/customer';

export const useCustomer = () => {
  const [customers, setCustomers] = useState<CustomerRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    CustomerService.getAllCustomers().then((data) => {
      setCustomers(data);
      setLoading(false);
    });
  }, []);

  return { customers, loading, refetch: () => CustomerService.getAllCustomers().then(setCustomers) };
};
