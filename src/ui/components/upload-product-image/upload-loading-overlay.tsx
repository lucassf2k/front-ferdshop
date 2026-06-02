import { Loader2 } from 'lucide-react';

export const UploadLoadingOverlay = () => {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-black/40 backdrop-blur-sm">
      <Loader2 size={42} className="animate-spin text-white" />

      <span className="text-sm font-medium text-white">Enviando imagem...</span>
    </div>
  );
};
