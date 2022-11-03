import { Card } from '@mui/material';
import { CryptoOrder } from '../../../models/crypto_order';
import RecentOrdersTable from './RecentOrdersTable';
import { subDays } from 'date-fns';
import React from 'react';
import { useGetAllCustomerQuery } from '../../../generated';

export interface Customer {
  customer_id: number;
  fullname: string;
  phone: string;
  address: string;
  email: string;
  active: boolean;
}

function RecentOrders() {
  const { data } = useGetAllCustomerQuery();


  return (
    <Card>
      {data && (
        <RecentOrdersTable customers={data.laundry_service_customers} color="red" />
      )}
    </Card>
  );
}

export default RecentOrders;
