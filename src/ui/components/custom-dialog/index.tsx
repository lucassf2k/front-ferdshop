import { Button } from '@/ui/components/base-button';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/components/ui/dialog';
import { cn } from '@/ui/lib/utils';

const triggerVariants = {
  default: '',
  create:
    'bg-white font-bold text-amber-500 hover:bg-white hover:text-amber-500',
  delete:
    'bg-red-200 font-bold text-red-600 hover:bg-red-300 hover:text-red-600',
};

interface Props {
  title: string;
  dialogTitle: string;
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  description?: string;
  isLoading?: boolean;
  variant?: 'create' | 'delete' | 'default';
}

export const CustomActionDialogWrapper = ({
  title,
  dialogTitle,
  description,
  children,
  variant = 'default',
  open,
  onOpenChange,
}: Props) => {
  const dialogProps = open !== undefined ? { open, onOpenChange } : {};

  return (
    <Dialog {...dialogProps}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={cn('cursor-pointer', triggerVariants[variant])}
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
