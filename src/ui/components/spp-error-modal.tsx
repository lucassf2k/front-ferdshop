interface Props {
  open: boolean;
  message?: string;
  onClose?: () => void;
}

export const AppErrorToast = ({ open, message, onClose }: Props) => {
  if (!open) return null;

  const handleReload = () => window.location.reload();

  return (
    <div className="fixed inset-0 z-50">
      {/* Overlay bem suave */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[1.5px]" />

      {/* Toast */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 w-full max-w-md -translate-x-1/2 px-4">
        <div className="pointer-events-auto rounded-2xl bg-white/90 p-4 shadow-lg backdrop-blur-md">
          <div className="flex flex-col gap-2">
            {/* Title */}
            <p className="text-sm font-semibold text-gray-800">
              Tivemos um pequeno problema
            </p>

            {/* Message */}
            <p className="text-xs leading-relaxed text-gray-500">
              {message ||
                'Algo não saiu como esperado. Você pode tentar novamente ou reiniciar a aplicação.'}
            </p>

            {/* Actions */}
            <div className="mt-2 flex items-center justify-end gap-4">
              <button
                onClick={handleReload}
                className="cursor-pointer text-sm font-medium text-blue-600 transition-colors hover:text-blue-500"
              >
                Reiniciar
              </button>

              {onClose && (
                <button
                  onClick={onClose}
                  className="text-sm text-gray-400 transition-colors hover:text-gray-600"
                >
                  Agora não
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
