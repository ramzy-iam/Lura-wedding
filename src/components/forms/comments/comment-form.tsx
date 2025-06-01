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

const commentSchema = z.object({
  name: z.string().min(1, 'Nom requis'),
  email: z.string().email('Email invalide').optional().or(z.literal('')),
  comment: z.string().min(1, 'Commentaire requis'),
});

type CommentSchema = z.infer<typeof commentSchema>;

export const CommentForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const form = useForm<CommentSchema>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      name: '',
      email: '',
      comment: '',
    },
  });

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const insertEmoji = (emoji: any) => {
    const current = form.getValues('comment') || '';
    const newValue = current + emoji.native;
    form.setValue('comment', newValue);
    setShowEmojiPicker(false);
    textareaRef.current?.focus();
  };

  const onSubmit = (data: CommentSchema) => {
    console.log(data);
    // Submit logic here (e.g., API call)
    onSuccess?.();
    form.reset();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-full space-y-4"
      >
        <FormField
          control={form.control}
          name="name"
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
                <FormLabel>Commentaire</FormLabel>
                <div className="flex items-center gap-2">
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
              </div>
              <FormControl className="relative">
                <Textarea
                  placeholder="Écrivez votre commentaire..."
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
        <Button type="submit">Envoyer</Button>
      </form>
    </Form>
  );
};
