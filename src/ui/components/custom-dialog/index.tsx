import type { SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';
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

interface Props {
  title: string;
  dialogTitle: string;
  onSubmit: SubmitHandler<{
    name: string;
  }>;
  onHandleSubmit: UseFormHandleSubmit<
    {
      name: string;
    },
    {
      name: string;
    }
  >;
  children: React.ReactNode;
  description?: string;
}

export const CustomRegisterDialog = ({
  title,
  dialogTitle,
  children,
  onSubmit,
  onHandleSubmit,
  description,
}: Props) => {
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
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-2xl">{title}</DialogTitle>
          <DialogDescription>
            {description || 'Preencha do campus'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onHandleSubmit(onSubmit)}>
          {children}
          <DialogFooter className="mt-4">
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
