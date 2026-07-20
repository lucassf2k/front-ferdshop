import { ImageIcon } from 'lucide-react';
import { EmptyState } from './empty-state';
import { UploadLoadingOverlay } from './upload-loading-overlay';
import { StatusBadge } from './status-badge';

type UploadAreaProps = {
  children: React.ReactNode;
  previewUrl: string | null;
  inputId: string;
  isPending?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
};

export const UploadArea = ({
  children,
  previewUrl,
  isPending,
  isSuccess,
  isError,
  inputId,
}: UploadAreaProps) => {
  return (
    <label
      htmlFor={inputId}
      className="group relative flex min-h-20 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-zinc-300 bg-zinc-50 transition hover:border-zinc-400 hover:bg-zinc-100"
    >
      {children}

      {!previewUrl ? (
        <EmptyState />
      ) : (
        <>
          <img
            src={previewUrl}
            alt="Preview da imagem"
            className={`h-20 w-full object-cover transition duration-300 ${
              isPending ? 'scale-105 opacity-40 blur-[2px]' : ''
            }`}
          />

          <div className="absolute top-1 left-1 rounded-full bg-black/50 p-1 backdrop-blur-sm">
            <ImageIcon size={12} className="text-white" />
          </div>

          {isPending && <UploadLoadingOverlay />}

          {isSuccess && <StatusBadge type="success" label="Upload concluído" />}

          {isError && <StatusBadge type="error" label="Erro no upload" />}
        </>
      )}
    </label>
  );
};
