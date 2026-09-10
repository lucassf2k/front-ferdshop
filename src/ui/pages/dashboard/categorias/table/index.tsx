import { DataTable } from '@/ui/components/data-table';
import { categoriesColumns, type CategoryDataTable } from './config';

interface Props {
  categories: CategoryDataTable[];
}

export const CategoriesTable = ({ categories }: Props) => {
  const columns = categoriesColumns();

  return <DataTable columns={columns} data={categories} />;
};
