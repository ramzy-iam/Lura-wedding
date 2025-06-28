import { useMutation } from '@tanstack/react-query';
import { uploadFileToGDrive } from '@/lib/api';
import { toast } from 'sonner';

interface UploadParams {
  file: File;
  metadata?: { name?: string; parents?: string[] };
}

export const useGDriveUpload = () => {
  return useMutation<
    { success: boolean; data?: { id: string }; error?: string },
    Error,
    UploadParams
  >({
    mutationFn: async ({ file, metadata }) => {
      return uploadFileToGDrive(file, metadata);
    },
    onSuccess: (result) => {
      if (result.success) {
        toast.success('Fichier téléchargé avec succès sur Google Drive!');
      } else {
        toast.error(result.error || 'Échec du téléchargement');
      }
    },
    onError: (error) => {
      toast.error('Erreur lors du téléchargement: ' + error.message);
    },
  });
};
