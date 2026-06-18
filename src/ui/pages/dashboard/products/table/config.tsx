import type { ProductModel } from '@/domain/model/product';
import { formatter } from '@/ui/lib/formatters';
import type { ColumnDef } from '@tanstack/react-table';
import type { ReactNode } from 'react';

export type ProductDataTable = ProductModel;
type RenderProductAcionTable = (product: ProductDataTable) => ReactNode;

export const productColumns = (
  renderEditComp: RenderProductAcionTable,
  renderDeleteComp: RenderProductAcionTable,
): ColumnDef<ProductDataTable>[] => {
  return [
    {
      accessorKey: 'id',
      header: 'ID',
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return formatter.unwrapTableValue(value);
      },
    },
    {
      accessorKey: 'name',
      header: 'Nome',
    },
    {
      accessorKey: 'price',
      header: 'Preço',
      cell: ({ getValue }) => {
        const value = getValue<number>();
        return formatter.currency(value);
      },
    },
    {
      accessorKey: 'stock',
      header: 'Estoque',
    },
    {
      accessorKey: 'description',
      header: 'Descrição',
      cell: ({ getValue }) => {
        const value = getValue<string>();
        return formatter.unwrapTableValue(value);
      },
    },
    {
      accessorKey: 'imageUrl',
      header: 'Imagem',
    },
    {
      accessorKey: 'reviewCount',
      header: 'Avaliação',
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
    {
      accessorKey: 'actions',
      header: 'Ações',
      cell: ({ row }) => {
        const product = row.original;
        return (
          <div className="flex gap-2">
            {renderEditComp(product)}
            {renderDeleteComp(product)}
          </div>
        );
      },
    },
  ];
};
