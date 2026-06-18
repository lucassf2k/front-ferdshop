import { DataTable } from '@/ui/components/data-table';
import {
  productColumns,
  type ProductDataTable,
} from '@/ui/pages/dashboard/products/table/config';

type RenderProductActionTable = (product: ProductDataTable) => React.ReactNode;
interface Props {
  products: ProductDataTable[];
  renderEditComp: RenderProductActionTable;
  renderDeleteComp: RenderProductActionTable;
}

export const ProductsTable = ({
  products,
  renderEditComp,
  renderDeleteComp,
}: Props) => {
  const columns = productColumns(renderEditComp, renderDeleteComp);

  return <DataTable columns={columns} data={products} />;
};
