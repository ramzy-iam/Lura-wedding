import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { commentSchema, querySchema } from '@/app/schema';
import sanitizeHtml from 'sanitize-html';

const prisma = new PrismaClient();
const ALLOWED_SORT_ORDERS = ['asc', 'desc'] as const;

function sanitizeInput(input: string | null | undefined): string | null {
  if (!input) return null;
  return sanitizeHtml(input.trim(), {
    allowedTags: [],
    allowedAttributes: {},
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = commentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.errors.map((e) => e.message).join(', '),
        },
        { status: 400 },
      );
    }

    const { author, comment, email } = parsed.data;

    const sanitizedAuthor = sanitizeInput(author);
    const sanitizedComment = sanitizeInput(comment);
    const sanitizedEmail = sanitizeInput(email);

    const newComment = await prisma.comment.create({
      data: {
        author: sanitizedAuthor!,
        comment: sanitizedComment!,
        email: sanitizedEmail,
      },
    });

    return NextResponse.json(
      { success: true, comment: newComment },
      { status: 201 },
    );
  } catch (error) {
    console.error(
      'Failed to add comment:',
      error instanceof Error ? error.stack : error,
    );
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const parsed = querySchema.safeParse({
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
      sort: searchParams.get('sort'),
    });

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.errors.map((e) => e.message).join(', '),
        },
        { status: 400 },
      );
    }

    const { page, limit } = parsed.data;
    let { sort: sortOrder } = parsed.data;

    // Validate sort order to avoid injection or Prisma errors
    if (!ALLOWED_SORT_ORDERS.includes(sortOrder)) {
      sortOrder = 'desc';
    }

    const skip = (page - 1) * limit;

    const total = await prisma.comment.count();

    const comments = await prisma.comment.findMany({
      orderBy: { createdAt: sortOrder },
      skip,
      take: limit,
    });

    const totalPages = Math.ceil(total / limit);

    return NextResponse.json({
      success: true,
      data: comments,
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
    });
  } catch (error) {
    console.error(
      'Failed to fetch comments:',
      error instanceof Error ? error.stack : error,
    );
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 },
    );
  }
}
