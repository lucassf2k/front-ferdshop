import z from 'zod';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomRegisterDialog } from '@/ui/components/custom-dialog';
import { BaseInput } from '@/ui/components/form/input';
import { api } from '@/api';
import type { Category } from '@/domain/entities/category';

const registerCategorySchema = z.object({
  name: z.string().min(1, { error: 'nome é obrigatório' }),
});
type RegisterCategorySchema = z.infer<typeof registerCategorySchema>;

export const RegisterCategoriesDialog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerCategorySchema),
  });

  const handleSaveCategory: SubmitHandler<RegisterCategorySchema> = async (
    data,
  ) => {
    const category: Category = {
      name: data.name,
    };
    const response = await api.fetch('categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(category),
    });
    console.log(response);
  };

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
