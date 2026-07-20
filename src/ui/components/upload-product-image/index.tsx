import { zodResolver } from '@hookform/resolvers/zod';
import { useMemo } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../base-button';
import { useImagePreview } from './hooks/use-image-preview';
import { SelectedFileCard } from './selected-file-card';
import { UploadArea } from './upload-area';

const uploadImageSchema = z.object({
  image: z.instanceof(FileList).refine((files) => files.length > 0, {
    message: 'Selecione uma imagem',
  }),
});

type UploadImageFormData = z.infer<typeof uploadImageSchema>;

interface Props {
  isPending: boolean;
  isError: boolean;
  isSuccess: boolean;
  onUpload: (file: File) => void;
}

export const UploadProductImageForm = ({
  isPending,
  isError,
  isSuccess,
  onUpload,
}: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<UploadImageFormData>({
    resolver: zodResolver(uploadImageSchema),
  });

  const selectedFile = watch('image')?.[0];

  const previewUrl = useImagePreview(selectedFile);

  const formattedFileSize = useMemo(() => {
    if (!selectedFile) return null;

    return `${(selectedFile.size / 1024 / 1024).toFixed(2)} MB`;
  }, [selectedFile]);

  const handleUploadImage: SubmitHandler<UploadImageFormData> = ({ image }) => {
    const file = image[0];
    onUpload(file);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleUploadImage)}
      className="mx-auto flex w-full max-w-md flex-col gap-5"
    >
      <UploadArea
        previewUrl={previewUrl}
        isPending={isPending}
        isSuccess={isSuccess}
        isError={isError}
      >
        <input
          id="image"
          type="file"
          accept="image/*"
          className="hidden"
          {...register('image')}
        />
      </UploadArea>

      {errors.image && (
        <span className="text-sm text-red-500">{errors.image.message}</span>
      )}

      {selectedFile && (
        <SelectedFileCard
          fileName={selectedFile.name}
          fileSize={formattedFileSize ?? ''}
        />
      )}

      <Button
        type="submit"
        disabled={!selectedFile || isPending}
        isLoading={isPending}
        className="cursor-pointer bg-amber-500 font-semibold text-white hover:bg-amber-600"
      >
        {isPending ? 'Enviando arquivo...' : 'Salvar imagem'}
      </Button>
    </form>
  );
};
