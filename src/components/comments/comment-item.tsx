import { IComment } from '@/types';
import React, { useState } from 'react';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';

const rtf = new Intl.RelativeTimeFormat('fr', { numeric: 'auto' });

function getRelativeTime(date: Date): string {
  const now = Date.now();
  const diffInSeconds = (new Date(date).getTime() - now) / 1000;

  const divisions: { amount: number; unit: Intl.RelativeTimeFormatUnit }[] = [
    { amount: 60, unit: 'second' },
    { amount: 60, unit: 'minute' },
    { amount: 24, unit: 'hour' },
    { amount: 7, unit: 'day' },
    { amount: 4.34524, unit: 'week' },
    { amount: 12, unit: 'month' },
    { amount: Number.POSITIVE_INFINITY, unit: 'year' },
  ];

  let duration = diffInSeconds;
  for (const division of divisions) {
    if (Math.abs(duration) < division.amount) {
      return rtf.format(Math.round(duration), division.unit);
    }
    duration /= division.amount;
  }
  return '';
}

const MAX_PREVIEW_LENGTH = 70; // adjust this for your preferred preview length

export const CommentItem: React.FC<{ comment: IComment; isLast: boolean }> = ({
  comment,
  isLast,
}) => {
  const [expanded, setExpanded] = useState(false);

  const needsTruncate = comment.comment.length > MAX_PREVIEW_LENGTH;

  const displayedText = expanded
    ? comment.comment
    : comment.comment.substring(0, MAX_PREVIEW_LENGTH);

  return (
    <div className={`py-4 ${!isLast ? 'border-b border-gray-200' : ''}`}>
      <p className="flex items-center justify-between font-semibold">
        {comment.author}
        <span className="text-muted-foreground ml-2 text-sm">
          {getRelativeTime(comment.createdAt)}
        </span>
      </p>
      <div className="flex flex-col">
        <p className="mt-2 inline">{displayedText}</p>
        {needsTruncate && (
          <Button
            variant={'text'}
            className="text-primary w-fit cursor-pointer p-0 text-sm"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            {expanded ? 'Voir moins' : 'Voir plus'}
          </Button>
        )}
      </div>
    </div>
  );
};

export const CommentSkeleton = () => {
  return (
    <div className="border-b border-gray-200 py-4">
      <div className="mb-2 flex justify-between">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-4 w-16" />
      </div>
      <Skeleton className="h-12" />
    </div>
  );
};
