import type {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form';

import { DialogClose, DialogFooter } from '../ui/dialog';
import { Button } from '../base-button';

interface Props<TFormValues extends FieldValues> {
  children: React.ReactNode;
  onSubmit: SubmitHandler<TFormValues>;
  onHandleSubmit: UseFormHandleSubmit<TFormValues>;
  isLoading?: boolean;
}

export const DialogForm = <TFormValues extends FieldValues>({
  children,
  onSubmit,
  onHandleSubmit,
  isLoading,
}: Props<TFormValues>) => {
  return (
    <form
      onSubmit={onHandleSubmit(onSubmit)}
      className="flex min-h-0 flex-1 flex-col"
    >
      <div className="scrollbar-none min-h-0 flex-1 overflow-y-auto pr-2">
        <div className="space-y-4">{children}</div>
      </div>

      <DialogFooter className="mt-4 shrink-0 border-t pt-4">
        <DialogClose asChild>
          <Button
            type="button"
            className="cursor-pointer bg-red-500 hover:bg-red-500/90"
          >
            Cancelar
          </Button>
        </DialogClose>

        <Button
          type="submit"
          isLoading={isLoading}
          className="cursor-pointer bg-amber-500 hover:bg-amber-500/90"
        >
          Salvar
        </Button>
      </DialogFooter>
    </form>
  );
};
