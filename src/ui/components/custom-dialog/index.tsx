import { Button } from '@/ui/components/base-button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/components/ui/dialog';

interface Props {
  title: string;
  dialogTitle: string;
  children: React.ReactNode;
  description?: string;
  isLoading?: boolean;
}

export const CustomRegisterDialogWrapper = ({
  title,
  dialogTitle,
  description,
  children,
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

      <DialogContent className="flex max-h-[85vh] min-h-0 flex-col overflow-hidden sm:max-w-lg">
        <DialogHeader className="shrink-0">
          <DialogTitle className="text-2xl">{title}</DialogTitle>

          <DialogDescription>
            {description || 'Preencha os campos'}
          </DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  );
};
