import { PaymentMethodEnum } from '@/domain/model/order';
import { useUpdatePaymentStatusMutation } from '@/hooks/mutations/use-update-payment-status-mutation';
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
  status: PaymentMethodEnum;
};

const OPTIONS: { label: string; value: PaymentMethodEnum }[] = [
  { label: 'Cartão', value: PaymentMethodEnum.CARD },
  { label: 'Dinheiro', value: PaymentMethodEnum.CASH },
  { label: 'Pix', value: PaymentMethodEnum.PIX },
];

interface Props {
  orderId: string;
}

export const UpdatePaymentStatus = ({ orderId }: Props) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const {
    mutate: updateOrderStatusMutate,
    isPending: isUpdateOrderStatusPending,
  } = useUpdatePaymentStatusMutation(orderId);

  const handleUpdateOrderStatus: SubmitHandler<FormData> = (data) => {
    updateOrderStatusMutate({ id: orderId, status: data.status });
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
          rules={{ required: 'Selecione um status' }}
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
