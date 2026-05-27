import z from 'zod';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CustomRegisterDialog } from '@/ui/components/custom-dialog';
import { BaseInput } from '@/ui/components/form/input';
import { CustomSelect } from '@/ui/components/form/select';
import { currencyFormatter } from '@/services/format-currency';
import { useCreateProductMutation } from '@/hooks/mutations/use-create-product-mutation';
import type { CreateProductInput } from '@/domain/use-case/create-product';

const registerProductSchema = z.object({
  name: z.string().min(1, { error: 'nome é obrigatório' }),
  price: z.string({ error: 'preço é obrigatório' }),
  categoryId: z.string({ error: 'categoria é obrigatório' }),
  imageUrl: z.string({ error: 'imagem é obrigatória' }),
  description: z.string().optional(),
});
type RegisterProductSchema = z.infer<typeof registerProductSchema>;

const DEFAULT_VALUES = {
  name: '',
  price: '',
  categoryId: '',
  imageUrl: '',
  description: '',
} as const;

export const RegisterProductDialog = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerProductSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const { mutate } = useCreateProductMutation();

  const handleSaveProduct: SubmitHandler<RegisterProductSchema> = (data) => {
    const product: CreateProductInput = {
      name: data.name,
      price: Number(data.price),
      categoryId: data.categoryId,
      imageUrl: data.imageUrl,
      description: data.description,
    };
    mutate(product);
    reset();
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
              field.onChange(currencyFormatter.formatInput(e.target.value))
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
