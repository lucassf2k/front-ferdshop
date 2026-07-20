import { useEffect, useState } from 'react';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { currencyFormatter } from '@/services/format-currency';
import { DialogForm } from '@/ui/components/custom-dialog/dialog-form';
import { BaseInput } from '@/ui/components/form/input';
import { CustomSelect } from '@/ui/components/form/select';
import { CustomActionDialogWrapper } from '@/ui/components/custom-dialog';
import { useQueryListCategories } from '@/hooks/queries/use-fetch-get-categories';
import { Button } from '@/ui/components/base-button';
import { UploadProductImageForm } from '@/ui/components/upload-product-image';
import { LoadFile } from '@/ui/components/load-file.tsx';
import { useUploadProductImageMutation } from '@/hooks/mutations/use-upload-product-image-mutation';
import { useUpdateProductImageMutation } from '@/hooks/mutations/use-update-product-image-mutation';
import { useUpdateProductMutation } from '@/hooks/mutations/use-update-product-mutation';
import { toast } from 'sonner';
import { queries } from '@/constants/queries';
import { useQueryClient } from '@tanstack/react-query';

type UpdateProductDialogProps = {
  product: {
    id: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    category: {
      id: string;
      name: string;
    };
    imageUrl: string;
  };
};

type FormData = {
  name: string;
  price: string;
  stock: string;
  description: string;
  categoryId: string;
};

export const UpdateProductDialog = ({ product }: UpdateProductDialogProps) => {
  const {
    handleSubmit,
    register,
    control,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: product.name,
      price: currencyFormatter.formatInput(String(product.price)),
      stock: String(product.stock),
      description: product.description,
      categoryId: product.category.id,
    },
  });
  const queryClient = useQueryClient();
  const [updatingImage, setUpdatingImage] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { data: categoryData = [] } = useQueryListCategories();
  const {
    mutate: updateProductImageMutate,
    isPending: isPendingUpdatingProductImage,
  } = useUpdateProductImageMutation();
  const { mutate: updateProductMutate, isPending: isPendingUpdateProduct } =
    useUpdateProductMutation();

  const handleCloseDialog = (isOpen: boolean) => {
    if (isOpen) {
      reset();
      setUpdatingImage(false);
      setSelectedFile(null);
    }
    setIsOpen(isOpen);
  };

  const handleSetFile = (file: File | null) => {
    if (file === null) return;
    setSelectedFile(file);
  };

  const handleUpdateProductImage = () => {
    if (selectedFile === null) return;
    updateProductImageMutate(
      {
        id: product.id,
        file: selectedFile,
      },
      {
        onSuccess: () => {
          toast.success('Imagem atualizado com sucesso!');
          queryClient.invalidateQueries({
            queryKey: queries.productKeys.all,
          });
          setUpdatingImage(false);
          setSelectedFile(null);
          reset();
        },
      },
    );
  };

  const handleUpdateProduct: SubmitHandler<FormData> = (data) => {
    updateProductMutate(
      {
        id: product.id,
        name: data.name,
        price: currencyFormatter.parseToNumber(data.price),
        stock: Number(data.stock),
        categoryId: data.categoryId,
        description: data.description,
      },
      {
        onSuccess: () => {
          toast.success('Produto atualizado com sucesso!');
          queryClient.invalidateQueries({
            queryKey: queries.productKeys.all,
          });
          setUpdatingImage(false);
          setSelectedFile(null);
          reset();
        },
      },
    );
  };

  const handleUpdateImageUrl = () => setUpdatingImage(true);

  const isUpdateProductPending = false;

  return (
    <CustomActionDialogWrapper
      title="Editar produto"
      dialogTitle="Editar"
      open={isOpen}
      onOpenChange={handleCloseDialog}
    >
      <div className="flex gap-4 pb-4">
        {!updatingImage && (
          <>
            <img
              src={`http://localhost:3001/files/${product.imageUrl}`}
              alt={product.name}
              className="h-40 w-40 rounded-lg border object-cover"
            />
            <div className="flex flex-col items-center justify-between">
              <p className="text-[14px] text-zinc-600">
                Arquivo: {product.imageUrl}
              </p>

              <Button
                type="button"
                onClick={handleUpdateImageUrl}
                className="w-full cursor-pointer bg-amber-500 font-semibold hover:bg-amber-600"
              >
                Atualizar imagem
              </Button>
            </div>
          </>
        )}
        {updatingImage && (
          <div className="flex w-full flex-col gap-4">
            <LoadFile file={selectedFile} onChange={handleSetFile} />
            <Button
              type="button"
              onClick={handleUpdateProductImage}
              isLoading={isPendingUpdatingProductImage}
              disabled={!Boolean(selectedFile)}
              className="cursor-pointer bg-amber-500 hover:bg-amber-500/90"
            >
              Salvar imagem
            </Button>
          </div>
        )}
        {/* {updatingImage && <UploadProductImageForm />} */}
      </div>

      <DialogForm
        onHandleSubmit={handleSubmit}
        onSubmit={handleUpdateProduct}
        isLoading={isUpdateProductPending}
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
                field.onChange(currencyFormatter.parseToNumber(e.target.value))
              }
            />
          )}
        />

        <BaseInput
          label="Quantidade no estoque"
          placeholder="Ex.: 10"
          error={errors.stock?.message}
          {...register('stock')}
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
                  selectItems: categoryData.map((category) => ({
                    label: category.name,
                    value: category.id,
                  })),
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
      </DialogForm>
    </CustomActionDialogWrapper>
  );
};
