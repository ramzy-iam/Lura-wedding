'use client';

import React, { useState, useCallback } from 'react';
import {
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  Plus,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CommentForm, CommentFormModal, CommentFormSkeleton } from '../forms';
import { CommentItem, CommentSkeleton } from '../comments';
import { useComments } from '@/hooks/useComments';
import { IComment } from '@/types';

export const CommentSection = () => {
  const [open, setOpen] = useState(false);
  const [sortDesc, setSortDesc] = useState(true);

  const toggleSort = useCallback(() => {
    setSortDesc((prev) => !prev);
  }, []);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
    isLoading,
    isError,
    refetch,
  } = useComments(sortDesc);

  const comments: IComment[] = data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <section className="relative flex flex-col items-center gap-6 px-4 md:px-12 lg:items-start 2xl:px-32">
      {/* Mobile title and add button */}
      <div className="flex w-full items-center justify-between">
        <h2 className="section-heading text-primary">Coin Tendresse</h2>
        {!isLoading && (
          <Button
            size="sm"
            variant="secondary"
            onClick={() => setOpen(true)}
            className="cursor-pointer lg:hidden"
          >
            <Plus className="h-4 w-4" />
          </Button>
        )}
      </div>

      <p className="mb-4 w-full text-sm lg:text-[1rem]">
        {
          " Une pensée, un souvenir, un mot d'amour… Laissez un message aux mariés que tous pourront lire. "
        }
        <span className="font-semibold lg:hidden">
          Touchez le bouton en haut à droite pour ajouter le vôtre.
        </span>
      </p>

      <div className="flex w-full gap-5">
        <div className="border-accent2 max-h-[500px] w-full overflow-y-auto rounded-md border lg:border-0">
          {isFetchingNextPage && (
            <div className="w-full">
              <div className="h-1.5 w-full overflow-hidden bg-pink-100">
                <div className="animate-progress origin-left-right bg-accent2 h-full w-full"></div>
              </div>
            </div>
          )}
          <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-4 py-3">
            {!isLoading && data && (
              <div className="flex w-full items-center justify-between">
                <Button
                  variant="text"
                  size="sm"
                  onClick={toggleSort}
                  className="flex cursor-pointer items-center gap-1 text-sm"
                >
                  {sortDesc ? (
                    <>
                      <ArrowDownWideNarrow className="h-4 w-4" />
                      Plus récent
                    </>
                  ) : (
                    <>
                      <ArrowUpWideNarrow className="h-4 w-4" />
                      Plus ancien
                    </>
                  )}
                </Button>
                <Button
                  variant="text"
                  size="sm"
                  onClick={() => refetch()}
                  disabled={isFetching}
                  className="cursor-pointer"
                  title="Rafraichir"
                >
                  <RotateCcw />
                </Button>
              </div>
            )}
          </div>

          <div className="space-y-4 p-4">
            {isLoading && (
              <>
                <CommentSkeleton />
                <CommentSkeleton />
                <CommentSkeleton />
              </>
            )}
            {isError && (
              <div className="text-red-500">
                Une erreur est survenue.
                <Button
                  onClick={() => refetch()}
                  variant="ghost"
                  size="sm"
                  className="ml-2 cursor-pointer"
                >
                  Réessayer
                </Button>
              </div>
            )}

            {comments.map((comment, idx) => (
              <CommentItem
                key={`${comment.id}-${idx}`}
                comment={comment}
                isLast={idx === comments.length - 1}
              />
            ))}

            {hasNextPage && (
              <Button
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
                variant="text"
                className="bg-navbar-background w-full cursor-pointer"
              >
                {isFetchingNextPage ? 'Chargement...' : 'Afficher plus'}
              </Button>
            )}
          </div>
        </div>

        {/* Desktop inline form */}
        <div className="hidden w-full lg:block">
          {isLoading ? (
            <CommentFormSkeleton />
          ) : (
            <CommentForm
              sortDesc={true}
              onSuccess={() => {
                setSortDesc(true);
                refetch();
              }}
            />
          )}
        </div>
      </div>

      {/* Mobile modal form */}
      <CommentFormModal
        open={open}
        onOpenChange={setOpen}
        sortDesc={true}
        onSuccess={() => {
          setSortDesc(true);
          refetch();
        }}
      />
    </section>
  );
};
