import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/ui/components/ui/dialog';

interface Props {
  trigger: React.ReactElement;
  children?: React.ReactNode;
}

export const CardInfo = ({ trigger, children }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="m-0 flex w-full max-w-125 flex-col items-center rounded-md border-0 p-0">
        {children}
      </DialogContent>
    </Dialog>
  );
};
