import { currencyFormatter } from '@/services/format-currency';
import { CustomRegisterDialogWrapper } from '@/ui/components/custom-dialog';
import { DialogForm } from '@/ui/components/custom-dialog/dialog-form';
import { BaseInput } from '@/ui/components/form/input';
import { CustomSelect } from '@/ui/components/form/select';
import { UploadProductImageForm } from '@/ui/components/upload-product-image';
import { useRegisterProductController } from '@/ui/controllers/use-register-product-controller';
import { Controller } from 'react-hook-form';

export const RegisterProductDialog = () => {
  const {
    form: {
      handleSubmit,
      register,
      formState: { errors },
      control,
    },
    categoryData,
    isUploadProductImagePending,
    isUploadProductImageSuccess,
    isUploadProductImageError,
    isEnabledForm,
    hasCategories,
    isCreateProductPending,
    handleUploadProductImage,
    handleSaveProduct,
  } = useRegisterProductController();

  return (
    <CustomRegisterDialogWrapper
      title="Cadastrar produtos"
      dialogTitle="Produtos"
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
          {!isEnabledForm && (
            <UploadProductImageForm
              onUpload={handleUploadProductImage}
              isPending={isUploadProductImagePending}
              isSuccess={isUploadProductImageSuccess}
              isError={isUploadProductImageError}
            />
          )}

          {!isEnabledForm && (
            <div className="flex items-center justify-center">
              <h2 className="text-md text-zinc-600">
                Após salvar a imagem o formulário vai ser liberado!
              </h2>
            </div>
          )}

          {isEnabledForm && (
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
    </CustomRegisterDialogWrapper>
  );
};
