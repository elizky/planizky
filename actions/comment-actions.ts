'use server';

import {
  createComment,
  updateComment,
  getCommentsByTrainingDay,
  getCommentsByExercise,
  deleteComment,
} from '@/lib/services/commentService';

export async function addCommentAction({
  content,
  userId,
  exerciseId,
  trainingDayId,
}: {
  content: string;
  userId: string;
  exerciseId?: string;
  trainingDayId?: string;
}) {
  try {
    return await createComment({ content, userId, exerciseId, trainingDayId });
  } catch (error) {
    console.error('Error in addCommentAction:', error);
    throw new Error('Failed to add comment');
  }
}

export async function updateCommentAction(
  commentId: string,
  updates: Partial<{
    content: string;
    userId: string;
    exerciseId?: string;
    trainingDayId?: string;
  }>
) {
  try {
    return await updateComment(commentId, updates);
  } catch (error) {
    console.error('Error in updateCommentAction:', error);
    throw new Error('Failed to update comment');
  }
}

export async function getCommentsByTrainingDayAction(trainingDayId: string) {
  try {
    return await getCommentsByTrainingDay(trainingDayId);
  } catch (error) {
    console.error('Error in getCommentsByTrainingDayAction:', error);
    throw new Error('Failed to fetch comments by training day');
  }
}

export async function getCommentsByExerciseAction(exerciseId: string) {
  try {
    return await getCommentsByExercise(exerciseId);
  } catch (error) {
    console.error('Error in getCommentsByExerciseAction:', error);
    throw new Error('Failed to fetch comments by exercise');
  }
}

export async function deleteCommentAction(commentId: string) {
  try {
    return await deleteComment(commentId);
  } catch (error) {
    console.error('Error in deleteCommentAction:', error);
    throw new Error('Failed to delete comment');
  }
}
