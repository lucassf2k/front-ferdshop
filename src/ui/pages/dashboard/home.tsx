import { DataTable } from '@/ui/components/data-table';
import { RegisterCategoriesDialog } from './components/register-categories';
import { RegisterOrganizationDialog } from './components/register-organization';
import { RegisterProductDialog } from './components/register-product';

import type { ColumnDef } from '@tanstack/react-table';
import { ProductsTable } from './products/table';
import { DashboardProductsPage } from './products';

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: 'pending' | 'processing' | 'success' | 'failed';
  email: string;
};

export const payments: Payment[] = [
  {
    id: '728ed52f',
    amount: 100,
    status: 'pending',
    email: 'm@example.com',
  },
  {
    id: '489e1d42',
    amount: 125,
    status: 'processing',
    email: 'example@gmail.com',
  },
  // ...
];

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: 'status',
    header: 'Status',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className="flex gap-2">
          <button onClick={() => console.log('Edit', payment.id)}>Edit</button>
          <button onClick={() => console.log('Delete', payment.id)}>
            Delete
          </button>
        </div>
      );
    },
  },
];

export const DashboradHomePage = () => {
  return (
    <div className="">
      {/* <RegisterCategoriesDialog />
      <RegisterProductDialog />
      <RegisterOrganizationDialog /> */}

      <DashboardProductsPage />
    </div>
  );
};
