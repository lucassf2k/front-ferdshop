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
import { useEffect, useState } from 'react';
import { currencyFormatter } from '@/services/format-currency';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { queries } from '@/constants/queries';

const DEFAULT_VALUES = {
  name: '',
  price: '',
  stock: '',
  categoryId: '',
  description: '',
} as const;

export const useRegisterProductController = () => {
  const queryClient = useQueryClient();

  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const form = useForm({
    resolver: zodResolver(registerProductSchema),
    defaultValues: DEFAULT_VALUES,
  });

  const { data: categoryData = [], isSuccess: isCategorySuccess } =
    useQueryListCategories();

  const {
    mutate,
    isPending: isCreateProductPending,
    reset: resetCreateProduct,
  } = useCreateProductMutation();

  const handleSetFile = (file: File | null) => {
    setUploadedFile(file);
  };

  const handleSaveProduct: SubmitHandler<RegisterProductSchema> = (data) => {
    if (uploadedFile === null) return;
    const product: CreateProductInput = {
      file: uploadedFile,
      name: data.name,
      price: Number(currencyFormatter.parseToNumber(data.price)),
      stock: Number(data.stock),
      categoryId: data.categoryId,
      description: data.description,
    };
    mutate(product, {
      onSuccess: () => {
        toast.success('Produto criado com sucesso!');
        form.reset();
        resetCreateProduct();
        setUploadedFile(null);
        queryClient.invalidateQueries({
          queryKey: queries.productKeys.all,
        });
      },
    });
  };

  const hasCategories = isCategorySuccess && categoryData.length > 0;

  return {
    form,
    categoryData,
    uploadedFile,
    isCreateProductPending,
    hasCategories,
    handleSetFile,
    handleSaveProduct,
  };
};
