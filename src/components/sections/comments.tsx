'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CommentFormModal } from '../forms';

export const CommentSection = () => {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative flex items-center gap-6 px-4 py-20 sm:p-[128px]">
      <div className="flex w-full items-center justify-between">
        <h2 className="section-heading text-primary">Commentaires</h2>
        <Button size="sm" variant="secondary" onClick={() => setOpen(true)}>
          <Plus />
        </Button>
      </div>

      <CommentFormModal open={open} onOpenChange={setOpen} />
    </section>
  );
};
