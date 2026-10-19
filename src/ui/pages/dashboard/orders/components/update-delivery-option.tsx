import { DeliveryOptionEnum } from '@/domain/use-case/create-order';
import { useUpdateDeliveryOptionMutation } from '@/hooks/mutations/use-update-delivery-option';
import { CustomActionDialogWrapper } from '@/ui/components/custom-dialog';
import { DialogForm } from '@/ui/components/custom-dialog/dialog-form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/ui/components/ui/select';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';

type FormData = {
  status: DeliveryOptionEnum;
};

const OPTIONS: { label: string; value: DeliveryOptionEnum }[] = [
  { label: 'Entrega', value: DeliveryOptionEnum.DELIVERY },
  { label: 'Retirada', value: DeliveryOptionEnum.PICKUP },
];

interface Props {
  orderId: string;
}

export const UpdateDeliveryOption = ({ orderId }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const {
    mutate: updateOrderStatusMutate,
    isPending: isUpdateOrderStatusPending,
  } = useUpdateDeliveryOptionMutation(orderId);

  const handleUpdateOrderStatus: SubmitHandler<FormData> = (data) => {
    updateOrderStatusMutate({ orderId: orderId, option: data.status });
  };

  if (!orderId) return null;

  return (
    <CustomActionDialogWrapper
      title="Alterar status"
      dialogTitle="Alterar status"
      variant="default"
    >
      <DialogForm
        onHandleSubmit={handleSubmit}
        onSubmit={handleUpdateOrderStatus}
        isLoading={isUpdateOrderStatusPending}
      >
        <Controller
          name="status"
          control={control}
          rules={{ required: 'Selecione uma opção' }}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full border-blue-500 bg-white focus:ring-blue-500">
                <SelectValue placeholder="Selecione o status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {OPTIONS.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="text-black"
                    >
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
        {errors.status && (
          <span className="text-sm text-red-500">{errors.status.message}</span>
        )}
      </DialogForm>
    </CustomActionDialogWrapper>
  );
};
