type SelectedFileCardProps = {
  fileName: string;
  fileSize: string;
};

export const SelectedFileCard = ({
  fileName,
  fileSize,
}: SelectedFileCardProps) => {
  return (
    <div className="flex flex-col items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <span className="max-w-55 truncate text-sm font-medium text-zinc-700">
          {fileName}
        </span>

        <span className="text-xs text-zinc-500">{fileSize}</span>
      </div>

      <span className="rounded-full bg-zinc-100 px-2 py-1 text-xs font-medium text-zinc-600">
        selecionado
      </span>
    </div>
  );
};
