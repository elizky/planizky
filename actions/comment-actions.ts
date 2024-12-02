'use server';

import { createComment, deleteComment } from '@/lib/services/commentService';

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

export async function deleteCommentAction(commentId: string) {
  try {
    return await deleteComment(commentId);
  } catch (error) {
    console.error('Error in deleteCommentAction:', error);
    throw new Error('Failed to delete comment');
  }
}
