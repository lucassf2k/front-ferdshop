import { useId, useMemo } from 'react';
import { UploadArea } from '../upload-product-image/upload-area';
import { SelectedFileCard } from '../upload-product-image/selected-file-card';
import { useImagePreview } from '../upload-product-image/hooks/use-image-preview';

interface Props {
  file: File | null;
  onChange: (file: File | null) => void;
}

export const LoadFile = ({ file, onChange }: Props) => {
  const previewUrl = useImagePreview(file ?? undefined);
  const inputId = useId();

  const formattedFileSize = useMemo(() => {
    if (!file) return null;
    return `${(file.size / 1024 / 1024).toFixed(2)} MB`;
  }, [file]);

  const handleSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] ?? null;
    onChange(selectedFile);
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-5">
      <UploadArea previewUrl={previewUrl} inputId={inputId}>
        <input
          id={inputId}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleSelectFile}
        />
      </UploadArea>

      {file && (
        <SelectedFileCard
          fileName={file.name}
          fileSize={formattedFileSize ?? ''}
        />
      )}
    </div>
  );
};
