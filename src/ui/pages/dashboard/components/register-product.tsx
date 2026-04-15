import z from 'zod';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomRegisterDialog } from '@/ui/components/custom-dialog';
import { BaseInput } from '@/ui/components/form/input';
import type { Category } from '@/domain/entities/category';
import { api } from '@/api';
import { CustomSelect } from '@/ui/components/form/select';
import { formatCurrencyService } from '@/services/format-currency';

const registerProductSchema = z.object({
  name: z.string().min(1, { error: 'nome é obrigatório' }),
  price: z.string({ error: 'preço é obrigatório' }),
  categoryId: z.string({ error: 'categoria é obrigatório' }),
  description: z.string().optional(),
});
type RegisterProductSchema = z.infer<typeof registerProductSchema>;

export const RegisterProductDialog = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerProductSchema),
    defaultValues: {
      name: '',
      price: '',
      categoryId: '',
      description: '',
    },
  });

  const handleSaveProduct: SubmitHandler<RegisterProductSchema> = async (
    data,
  ) => {
    console.log(data);
  };

  return (
    <CustomRegisterDialog
      title="Cadastrar produtos"
      dialogTitle="Produtos"
      onHandleSubmit={handleSubmit}
      onSubmit={handleSaveProduct}
    >
      <BaseInput
        label="Nome do produto"
        placeholder="Ex.: Água"
        error={errors.name?.message}
        {...register('name')}
      />
      <Controller
        control={control}
        name="price"
        render={({ field }) => (
          <BaseInput
            label="Preço do produto"
            placeholder="Ex.: 12,50"
            error={errors.price?.message}
            value={field.value ?? ''}
            onChange={(e) =>
              field.onChange(formatCurrencyService.toReal(e.target.value))
            }
          />
        )}
      />

      <Controller
        control={control}
        name="categoryId"
        render={({ field }) => (
          <CustomSelect
            label="Categoria"
            placehold="Selecione categoria"
            value={field.value}
            onValueChange={field.onChange}
            error={errors.categoryId?.message}
            items={[
              {
                groupLabel: 'Categorias',
                selectItems: [
                  { label: 'Bebidas', value: 'bebidas' },
                  { label: 'Alimentos', value: 'alimentos' },
                  { label: 'Limpeza', value: 'limpeza' },
                ],
              },
            ]}
          />
        )}
      />
      <BaseInput
        label="Descrição do produto"
        placeholder="Ex.: Água 20L"
        error={errors.description?.message}
        {...register('description')}
      />
    </CustomRegisterDialog>
  );
};
