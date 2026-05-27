import { useCreateCategoryMutation } from '@/hooks/mutations/use-create-category-mutation';
import {
  registerCategorySchema,
  type RegisterCategorySchema,
} from '@/schemas/create-categories';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, type SubmitHandler } from 'react-hook-form';

export const useRegisterCategoriesController = () => {
  const form = useForm({
    resolver: zodResolver(registerCategorySchema),
  });

  const createCateogryMutation = useCreateCategoryMutation();

  const handleSaveCategory: SubmitHandler<RegisterCategorySchema> = (data) => {
    createCateogryMutation.mutate(data);
    form.reset();
  };

  return { form, createCateogryMutation, handleSaveCategory };
};
