'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { Camera, Home, Upload, X } from 'lucide-react';
import { useGDriveUpload } from '@/hooks';

interface UploadedPicture {
  id: string;
  name: string;
  url: string;
  uploadedAt: Date;
  fileId: string;
}

const STORAGE_KEY = 'uploadedPictures';

export default function PicturesPage() {
  const [pictures, setPictures] = useState<UploadedPicture[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: uploadFile, isPending } = useGDriveUpload();

  // Load pictures from localStorage on mount
  useEffect(() => {
    const savedPictures = localStorage.getItem(STORAGE_KEY);
    if (savedPictures) {
      setPictures(JSON.parse(savedPictures));
    }
  }, []);

  // Save pictures to localStorage whenever pictures change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pictures));
  }, [pictures]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.error('Veuillez sélectionner une image valide');
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      console.error('La taille du fichier ne doit pas dépasser 10MB');
      return;
    }

    setIsUploading(true);

    uploadFile(
      {
        file,
        metadata: {
          name: `wedding-${Date.now()}-${file.name}`,
        },
      },
      {
        onSuccess: (result) => {
          if (result.success && result.data) {
            const newPicture: UploadedPicture = {
              id: Date.now().toString(),
              name: file.name,
              url: `https://drive.google.com/uc?id=${result.data.id}`,
              uploadedAt: new Date(),
              fileId: result.data.id,
            };
            setPictures((prev) => [newPicture, ...prev]);
          }
          setIsUploading(false);
        },
        onError: () => {
          setIsUploading(false);
        },
      },
    );

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removePicture = (id: string) => {
    setPictures((prev) => prev.filter((pic) => pic.id !== id));
  };

  const isLoading = isPending || isUploading;

  return (
    <main className="relative mx-auto flex min-h-svh flex-col items-center px-4 py-8">
      <img
        src="/images/flower.png"
        alt="Décoration florale"
        className="pointer-events-none absolute top-0 left-0 h-auto w-20 select-none md:w-32"
      />

      <div className="mt-11 mb-6 text-center">
        <p className="text-lg font-medium text-[#AD1061]">
          {'Partagez vos plus beaux souvenirs 📸'}
        </p>
        <h1 className="font-satisfy mt-2 text-[32px] tracking-wide text-[#214f61]">
          LuRa 💍
        </h1>
      </div>

      {/* Upload Section */}
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-gradient-to-br from-[#214f61] via-[#01B7CC] to-[#015d82] p-[6px]">
        <div className="rounded-2xl bg-white p-6 text-center shadow-xl">
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileUpload}
            accept="image/*"
            className="hidden"
            disabled={isLoading}
          />

          <div className="space-y-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading}
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#AD1061] px-6 py-3 text-white transition hover:bg-[#8A1049] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Upload className="h-5 w-5 animate-spin" />
                  Téléchargement...
                </>
              ) : (
                <>
                  <Camera className="h-5 w-5" />
                  Ajouter une photo
                </>
              )}
            </button>

            <Link
              href="/"
              className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl border border-[#015d82] px-6 py-3 text-[#015d82] transition hover:bg-[#015d82] hover:text-white"
            >
              <Home className="h-5 w-5" />
              {"Retour au Jardin d'Éden"}
            </Link>
          </div>
        </div>
      </div>

      {/* Pictures Grid */}
      {pictures.length > 0 && (
        <div className="mt-8 w-full max-w-4xl">
          <h2 className="mb-6 text-center text-xl font-semibold text-[#214f61]">
            Vos souvenirs partagés ({pictures.length})
          </h2>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {pictures.map((picture) => (
              <div
                key={picture.id}
                className="group relative overflow-hidden rounded-lg bg-white shadow-md transition hover:shadow-lg"
              >
                <img
                  src={picture.url}
                  alt={picture.name}
                  className="h-40 w-full object-cover transition group-hover:scale-105"
                  loading="lazy"
                />

                <button
                  onClick={() => removePicture(picture.id)}
                  className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white opacity-0 transition group-hover:opacity-100"
                  title="Supprimer"
                >
                  <X className="h-4 w-4" />
                </button>

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                  <p className="truncate text-xs text-white">{picture.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {pictures.length === 0 && !isLoading && (
        <div className="mt-8 text-center">
          <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100">
            <Camera className="h-10 w-10 text-gray-400" />
          </div>
          <p className="text-gray-600">Aucune photo partagée pour le moment</p>
          <p className="text-sm text-gray-500">
            Soyez le premier à partager un souvenir !
          </p>
        </div>
      )}
    </main>
  );
}
