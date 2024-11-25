// src/lib/services/commentService.ts
import { db } from '@/server/db/prisma';
import { Comment } from '@prisma/client';

export const getCommentsByTrainingDay = async (trainingDayId: string): Promise<Comment[]> => {
  return db.comment.findMany({
    where: {
      trainingDayId,
    },
  });
};

export const getCommentsByExercise = async (exerciseId: string): Promise<Comment[]> => {
  return db.comment.findMany({
    where: {
      exerciseId,
    },
  });
};

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

export const updateComment = async (
  commentId: string,
  updates: Partial<{
    content: string;
    userId: string;
    exerciseId?: string;
    trainingDayId?: string;
  }>
): Promise<Comment> => {
  return db.comment.update({
    where: { id: commentId },
    data: updates,
  });
};

export const deleteComment = async (commentId: string): Promise<Comment> => {
  return db.comment.delete({
    where: { id: commentId },
  });
};
