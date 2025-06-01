export interface CreateComment {
  author: string;
  comment: string;
  email?: string;
}

export interface IComment {
  id: number;
  author: string;
  comment: string;
  createdAt: Date;
}

export interface CommentsResponse {
  data: IComment[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    nextPage: number | null;
    previousPage: number | null;
  };
}
