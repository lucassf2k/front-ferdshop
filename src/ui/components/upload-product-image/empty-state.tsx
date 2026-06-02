import { UploadCloud } from 'lucide-react';

export const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-6 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-sm transition group-hover:scale-105">
        <UploadCloud size={38} className="text-zinc-500" />
      </div>

      <div>
        <p className="text-lg font-semibold text-zinc-800">Buscar arquivo</p>

        <p className="mt-1 text-sm text-zinc-500">
          Clique para selecionar uma imagem
        </p>
      </div>
    </div>
  );
};
