'use client';

import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import { useGDriveUpload } from '@/hooks';

export const UploadForm = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadFile, isPending } = useGDriveUpload();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    uploadFile({
      file,
      metadata: {
        name: `wedding-${Date.now()}-${file.name}`,
        parents: ['1UvWNhjHmWxuUT-1FYSKLV6Fs600pkg4E'],
      },
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-4">
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileUpload}
        accept="image/*"
        className="hidden"
      />
      <Button
        onClick={() => fileInputRef.current?.click()}
        disabled={isPending}
        className="cursor-pointer"
      >
        {isPending ? 'Téléchargement...' : 'Choisir un fichier'}
      </Button>
    </div>
  );
};
