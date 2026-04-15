import { RegisterCategoriesDialog } from './components/register-categories';
import { RegisterProductDialog } from './components/register-product';

export const DashboradHomePage = () => {
  return (
    <div className="flex gap-3">
      <RegisterCategoriesDialog />
      <RegisterProductDialog />
    </div>
  );
};
