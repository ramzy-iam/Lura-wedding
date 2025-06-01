'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CommentForm } from './comment-form';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const CommentFormModal = ({ open, onOpenChange }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-100svw">
        <DialogHeader>
          <DialogTitle>Ajouter un commentaire</DialogTitle>
        </DialogHeader>
        <CommentForm onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};
