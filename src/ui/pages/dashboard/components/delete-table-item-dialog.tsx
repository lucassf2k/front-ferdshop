import { Button } from '@/ui/components/base-button';
import { CustomActionDialogWrapper } from '@/ui/components/custom-dialog';
import { DialogClose, DialogFooter } from '@/ui/components/ui/dialog';

interface Props {
  name: string;
  isLoading: boolean;
  onDelete: () => void;
}

export const DeleteTableItemDialog = ({ name, isLoading, onDelete }: Props) => {
  return (
    <CustomActionDialogWrapper
      dialogTitle="Excluir"
      title="Excluir item da tabela"
      variant="delete"
    >
      <div className="space-y-4">
        <div>
          <h2 className="font-semibold">
            Tem certeza que deseja excluir este item?
          </h2>
          <p className="mt-2 text-sm text-zinc-600">
            O item <strong>{name}</strong> deixará de ser visivel para o
            usuário!
          </p>
        </div>

        <div className="flex justify-end gap-2">
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
              type="button"
              onClick={onDelete}
              isLoading={isLoading}
              className="cursor-pointer bg-amber-500 hover:bg-amber-500/90"
            >
              Excluir
            </Button>
          </DialogFooter>
        </div>
      </div>
    </CustomActionDialogWrapper>
  );
};
