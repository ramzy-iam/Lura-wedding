import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { api } from '@/lib/api';
import { CommentsResponse, CreateComment, IComment } from '@/types';
import { COMMENTS } from '@/data/comments';
import { toast } from 'sonner';

const COMMENTS_PER_PAGE = 10;

// ---------------------------------------------------------------------------
// Old hooks (backed by the /api/comments endpoint + database). Kept for reference.
// ---------------------------------------------------------------------------

export const useCommentsOld = (sortDesc: boolean) => {
  return useInfiniteQuery({
    queryKey: ['comments', sortDesc],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await api.get<CommentsResponse>('/comments', {
        params: {
          page: pageParam,
          limit: COMMENTS_PER_PAGE,
          sort: sortDesc ? 'desc' : 'asc',
        },
      });
      return res.data;
    },
    initialPageParam: 1,
    getNextPageParam: ({ pagination }) => {
      const { nextPage } = pagination;
      if (!nextPage) return undefined;
      return nextPage;
    },
  });
};

export const useCreateCommentOld = () => {
  const queryClient = useQueryClient();

  return useMutation<
    IComment,
    unknown,
    { data: CreateComment; sortDesc?: boolean }
  >({
    mutationFn: async ({ data }) => {
      const res = await api.post<IComment>('/comments', data);
      return res.data;
    },
    onSuccess: (_, { sortDesc }) => {
      queryClient.invalidateQueries({ queryKey: ['comments', sortDesc] });
    },
    onError: () => {
      toast.error("Votre message n'a pas pu être envoyé, veuillez réessayer.");
    },
  });
};

// ---------------------------------------------------------------------------
// New hooks (static data from src/data/comments.ts, no server call).
// ---------------------------------------------------------------------------

// Paginates/sorts the static comments snapshot, mirroring the old
// GET /api/comments response shape so the UI is unchanged.
function getCommentsPage(page: number, sortDesc: boolean): CommentsResponse {
  const sorted = [...COMMENTS].sort((a, b) => {
    const diff = a.createdAt.getTime() - b.createdAt.getTime();
    return sortDesc ? -diff : diff;
  });

  const limit = COMMENTS_PER_PAGE;
  const total = sorted.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;

  return {
    data: sorted.slice(start, start + limit),
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
      nextPage: page < totalPages ? page + 1 : null,
      previousPage: page > 1 ? page - 1 : null,
    },
  };
}

export const useComments = (sortDesc: boolean) => {
  return useInfiniteQuery({
    queryKey: ['comments', sortDesc],
    queryFn: async ({ pageParam = 1 }) => getCommentsPage(pageParam, sortDesc),
    initialPageParam: 1,
    getNextPageParam: ({ pagination }) => pagination.nextPage ?? undefined,
  });
};

// Comments are closed: there is no backend anymore, so creating one always fails.
export const useCreateComment = () => {
  return useMutation<
    IComment,
    unknown,
    { data: CreateComment; sortDesc?: boolean }
  >({
    mutationFn: async () => {
      throw new Error('Comments are closed');
    },
    onError: () => {
      toast.error('Désolé, les commentaires sont désormais fermés.');
    },
  });
};
