import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { CommentForm } from './comment-form';

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sortDesc?: boolean;
  onSuccess?: () => void;
};

export const CommentFormModal = ({
  open,
  onOpenChange,
  sortDesc,
  onSuccess,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Un mot pour les mariés</DialogTitle>
          <DialogDescription className="sr-only">
            {
              "Une pensée, un souvenir, un mot d'amour... Laissez un message aux mariés que tous pourront lire."
            }
          </DialogDescription>
        </DialogHeader>
        <CommentForm
          onSuccess={() => {
            onSuccess?.();
            onOpenChange(false);
          }}
          sortDesc={sortDesc}
        />
      </DialogContent>
    </Dialog>
  );
};
