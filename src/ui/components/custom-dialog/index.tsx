import type {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form';

import { Button } from '@/ui/components/ui/button';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/components/ui/dialog';

interface Props<TFormValues extends FieldValues> {
  title: string;
  dialogTitle: string;
  onSubmit: SubmitHandler<TFormValues>;
  onHandleSubmit: UseFormHandleSubmit<TFormValues>;
  children: React.ReactNode;
  description?: string;
}

export const CustomRegisterDialog = <TFormValues extends FieldValues>({
  title,
  dialogTitle,
  children,
  onSubmit,
  onHandleSubmit,
  description,
}: Props<TFormValues>) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-green-200 hover:bg-green-200/70"
        >
          {dialogTitle}
        </Button>
      </DialogTrigger>

      <DialogContent className="flex max-h-[85vh] flex-col sm:max-w-lg">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-2xl">{title}</DialogTitle>

          <DialogDescription>
            {description || 'Preencha os campos'}
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={onHandleSubmit(onSubmit)}
          className="flex min-h-0 flex-1 flex-col"
        >
          <div className="scrollbar-none flex-1 overflow-y-auto pr-2">
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
              className="cursor-pointer bg-blue-500 hover:bg-blue-500/90"
            >
              Salvar
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
