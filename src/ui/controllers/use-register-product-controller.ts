import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  registerProductSchema,
  type RegisterProductSchema,
} from '@/schemas/create-product';
import { useQueryListCategories } from '@/hooks/queries/use-fetch-get-categories';
import { useUploadProductImageMutation } from '@/hooks/mutations/use-upload-product-image-mutation';
import { useCreateProductMutation } from '@/hooks/mutations/use-create-product-mutation';
import type { CreateProductInput } from '@/domain/use-case/create-product';
import { useEffect } from 'react';
import { currencyFormatter } from '@/services/format-currency';
import { toast } from 'sonner';

const DEFAULT_VALUES = {
  name: '',
  price: '',
  stock: '',
  categoryId: '',
  imageUrl: '',
  description: '',
} as const;

export const useRegisterProductController = () => {
  const form = useForm({
    resolver: zodResolver(registerProductSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const { data: categoryData = [], isSuccess: isCategorySuccess } =
    useQueryListCategories();

  const {
    mutate: uploadProductImage,
    isPending: isUploadProductImagePending,
    isSuccess: isUploadProductImageSuccess,
    isError: isUploadProductImageError,
    data: uploadProductImageData,
    reset: resetUploadProductImage,
  } = useUploadProductImageMutation();

  const {
    mutate,
    isPending: isCreateProductPending,
    reset: resetCreateProduct,
  } = useCreateProductMutation();

  const handleUploadProductImage = (file: File) => {
    uploadProductImage({ file });
  };

  const handleSaveProduct: SubmitHandler<RegisterProductSchema> = (data) => {
    const product: CreateProductInput = {
      name: data.name,
      price: Number(currencyFormatter.parseToNumber(data.price)),
      stock: Number(data.stock),
      categoryId: data.categoryId,
      imageUrl: data.imageUrl,
      description: data.description,
    };
    mutate(product, {
      onSuccess: () => {
        toast.success('Produto criado com sucesso!');
        form.reset();
        resetCreateProduct();
        resetUploadProductImage();
      },
    });
  };

  const { setValue } = form;

  useEffect(() => {
    if (!uploadProductImageData) return;

    setValue('imageUrl', uploadProductImageData.filename, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [uploadProductImageData, setValue]);

  const isEnabledForm =
    isUploadProductImageSuccess && Boolean(uploadProductImageData);
  const hasCategories = isCategorySuccess && categoryData.length > 0;

  return {
    form,
    categoryData,
    handleSaveProduct,
    handleUploadProductImage,
    isCreateProductPending,
    isEnabledForm,
    hasCategories,
    isUploadProductImagePending,
    isUploadProductImageSuccess,
    isUploadProductImageError,
  };
};
