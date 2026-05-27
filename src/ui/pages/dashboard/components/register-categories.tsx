import { CustomRegisterDialog } from '@/ui/components/custom-dialog';
import { BaseInput } from '@/ui/components/form/input';
import { useRegisterCategoriesController } from '@/ui/controllers/use-register-categories-controller';

export const RegisterCategoriesDialog = () => {
  const {
    form: {
      handleSubmit,
      register,
      formState: { errors },
    },
    handleSaveCategory,
  } = useRegisterCategoriesController();

  return (
    <CustomRegisterDialog
      title="Criar categorias"
      dialogTitle="Categorias"
      onHandleSubmit={handleSubmit}
      onSubmit={handleSaveCategory}
    >
      <BaseInput
        label="Nome da categoria"
        placeholder="Ex.: Eletrônicos"
        error={errors.name?.message}
        {...register('name')}
      />
    </CustomRegisterDialog>
  );
};
