import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { api } from '@/lib/api';
import { CommentsResponse, CreateComment, IComment } from '@/types';
import { toast } from 'sonner';

const COMMENTS_PER_PAGE = 10;

export const useComments = (sortDesc: boolean) => {
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

export const useCreateComment = () => {
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
