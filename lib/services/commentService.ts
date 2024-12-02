// src/lib/services/commentService.ts
import { db } from '@/server/db/prisma';
import { Comment } from '@prisma/client';

export const createComment = async (commentData: {
  content: string;
  userId: string;
  exerciseId?: string;
  trainingDayId?: string;
}): Promise<Comment> => {
  return db.comment.create({
    data: commentData,
  });
};

export const deleteComment = async (commentId: string): Promise<Comment> => {
  return db.comment.delete({
    where: { id: commentId },
  });
};
