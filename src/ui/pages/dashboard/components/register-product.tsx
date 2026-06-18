import { currencyFormatter } from '@/services/format-currency';
import { CustomActionDialogWrapper } from '@/ui/components/custom-dialog';
import { DialogForm } from '@/ui/components/custom-dialog/dialog-form';
import { BaseInput } from '@/ui/components/form/input';
import { CustomSelect } from '@/ui/components/form/select';
import { LoadFile } from '@/ui/components/load-file.tsx';
import { useRegisterProductController } from '@/ui/controllers/use-register-product-controller';
import { useState } from 'react';
import { Controller } from 'react-hook-form';

export const RegisterProductDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    form: {
      handleSubmit,
      register,
      reset,
      formState: { errors },
      control,
    },
    categoryData,
    uploadedFile,
    hasCategories,
    isCreateProductPending,
    handleSetFile,
    handleSaveProduct,
  } = useRegisterProductController();

  const handleSetUploadedFile = (file: File | null) => {
    if (file === null) return;
    handleSetFile(file);
  };

  const handleCloseDialog = (isOpen: boolean) => {
    if (!isOpen) {
      reset();
      handleSetFile(null);
    }
    setIsOpen(isOpen);
  };

  return (
    <CustomActionDialogWrapper
      title="Cadastrar produtos"
      dialogTitle="Novo produto"
      variant="create"
      open={isOpen}
      onOpenChange={handleCloseDialog}
    >
      {categoryData?.length === 0 && (
        <div className="flex items-center justify-center">
          <h2 className="text-lg font-bold uppercase">
            Nenhuma categoria cadastrada, cadastre uma primeiro
          </h2>
        </div>
      )}

      {hasCategories && (
        <>
          <LoadFile file={uploadedFile} onChange={handleSetUploadedFile} />

          {!uploadedFile && (
            <div className="flex items-center justify-center">
              <h2 className="text-md text-zinc-600">
                Após salvar a imagem o formulário vai ser liberado!
              </h2>
            </div>
          )}

          {uploadedFile && (
            <DialogForm
              onHandleSubmit={handleSubmit}
              onSubmit={handleSaveProduct}
              isLoading={isCreateProductPending}
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
                      field.onChange(
                        currencyFormatter.formatInput(e.target.value),
                      )
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
                        selectItems: categoryData.map((c) => ({
                          label: c.name,
                          value: c.id,
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
          )}
        </>
      )}
    </CustomActionDialogWrapper>
  );
};
