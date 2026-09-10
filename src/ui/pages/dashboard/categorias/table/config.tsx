import type { CategoryModel } from '@/domain/model/category';
import { formatter } from '@/ui/lib/formatters';
import type { ColumnDef } from '@tanstack/react-table';

export type CategoryDataTable = CategoryModel;

export const categoriesColumns = (): ColumnDef<CategoryDataTable>[] => {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Título',
    },
    {
      accessorKey: 'createdAt',
      header: 'Criado em',
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return formatter.date(value);
      },
    },
    {
      accessorKey: 'updatedAt',
      header: 'Atualizado em',
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return formatter.date(value);
      },
    },
  ];
};
