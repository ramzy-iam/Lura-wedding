'use client';

import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { SmilePlus } from 'lucide-react';
import { useRef, useState } from 'react';
import fr from '@emoji-mart/data/i18n/fr.json';
import { useCreateComment } from '@/hooks';
import { Skeleton } from '@/components/ui/skeleton';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogDescription,
} from '@/components/ui/alert-dialog';

const commentSchema = z.object({
  author: z.string().min(1, 'Nom requis'),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  comment: z
    .string()
    .min(1, 'Message requis')
    .max(3000, 'Le message doit contenir au maximum 3000 caractères'),
});

type CommentSchema = z.infer<typeof commentSchema>;

export const CommentForm = ({
  onSuccess,
  sortDesc,
}: {
  onSuccess?: () => void;
  sortDesc?: boolean;
}) => {
  const form = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      author: '',
      email: '',
      comment: '',
    },
  });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingData, setPendingData] = useState<CommentSchema | null>(null);

  const insertEmoji = (emoji: { native: string }) => {
    const current = form.getValues('comment') ?? '';
    const newValue = current + emoji.native;
    form.setValue('comment', newValue);
    setShowEmojiPicker(false);
    textareaRef.current?.focus();
  };

  const { mutateAsync, isPending } = useCreateComment();

  const handleConfirm = async () => {
    if (!pendingData) return;

    const payload = { ...pendingData, email: pendingData.email || undefined };
    await mutateAsync({ data: payload, sortDesc });
    form.reset();
    setShowConfirmModal(false);
    setPendingData(null);
    onSuccess?.();
  };

  const handleRequestSubmit = (data: CommentSchema) => {
    setPendingData(data);
    setShowConfirmModal(true);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleRequestSubmit)}
          className="max-w-full space-y-4"
        >
          <FormField
            control={form.control}
            name="author"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Votre nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email (optionnel)</FormLabel>
                <FormControl>
                  <Input placeholder="email@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem className="relative">
                <div className="flex items-center justify-between">
                  <FormLabel>Votre message</FormLabel>
                  <Popover
                    open={showEmojiPicker}
                    onOpenChange={setShowEmojiPicker}
                    modal={true}
                  >
                    <PopoverTrigger asChild>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer"
                      >
                        <SmilePlus className="h-5 w-5" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      side="bottom"
                      align="end"
                      alignOffset={200}
                      sideOffset={-250}
                      className="max-h-[400px] w-full overflow-auto overflow-y-auto p-0 shadow-lg"
                    >
                      <Picker
                        data={data}
                        i18n={fr}
                        onEmojiSelect={insertEmoji}
                        previewPosition="none"
                        theme="light"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <FormControl className="relative">
                  <Textarea
                    placeholder="Écrivez votre message..."
                    {...field}
                    ref={(el) => {
                      field.ref(el);
                      textareaRef.current = el;
                    }}
                    className="max-h-48"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isPending} className="cursor-pointer">
            {isPending ? 'Envoi...' : 'Envoyer'}
          </Button>
        </form>
      </Form>

      {/* Modal de confirmation */}
      <AlertDialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmez l'envoi</AlertDialogTitle>
            <AlertDialogDescription>
              Ce message sera public, non modifiable, alors prenez un moment
              pour vérifier.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isPending}>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirm} disabled={isPending}>
              Envoyer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export const CommentFormSkeleton = () => {
  return (
    <div className="space-y-4">
      {/* Name input */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-20" /> {/* Label */}
        <Skeleton className="h-10 w-full" /> {/* Input */}
      </div>

      {/* Email input */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-28" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Comment textarea with emoji button */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-24" /> {/* Label */}
          <Skeleton className="h-8 w-8 rounded-full" /> {/* Emoji button */}
        </div>
        <Skeleton className="h-24 w-full" /> {/* Textarea */}
      </div>

      {/* Submit button */}
      <Skeleton className="h-10 w-24" />
    </div>
  );
};
