import { useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { addCommentAction, deleteCommentAction } from '@/actions/comment-actions';
import { TrainingDay, Exercise } from '@/types/types';

export function useComments(
  data: TrainingDay,
  setData: React.Dispatch<React.SetStateAction<TrainingDay>>,
  currentExercise: Exercise | null,
  userId: string
) {
  const [newComment, setNewComment] = useState('');

  const addComment = async () => {
    if (newComment.trim() && currentExercise) {
      const tempComment = {
        id: `temp-${Date.now()}`,
        content: newComment,
        userId,
        exerciseId: currentExercise.id,
        trainingDayId: data.id,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: data.plan.user,
      };

      const updatedExercises = [...data.exercises];
      const exerciseIndex = updatedExercises.findIndex((e) => e.id === currentExercise.id);

      if (exerciseIndex !== -1) {
        updatedExercises[exerciseIndex].comments = [
          ...(updatedExercises[exerciseIndex].comments || []),
          tempComment,
        ];
        setData((prev) => ({
          ...prev,
          exercises: updatedExercises,
        }));
        setNewComment('');
      }

      try {
        const newCommentData = {
          content: newComment,
          userId,
          trainingDayId: data.id,
          exerciseId: currentExercise.id,
        };
        const realComment = await addCommentAction(newCommentData);

        if (exerciseIndex !== -1) {
          updatedExercises[exerciseIndex].comments = updatedExercises[exerciseIndex].comments.map(
            (comment) => (comment.id === tempComment.id ? realComment : comment)
          );
          setData((prev) => ({
            ...prev,
            exercises: updatedExercises,
          }));
        }
      } catch (error) {
        if (exerciseIndex !== -1) {
          updatedExercises[exerciseIndex].comments = updatedExercises[
            exerciseIndex
          ].comments.filter((comment) => comment.id !== tempComment.id);
          setData((prev) => ({
            ...prev,
            exercises: updatedExercises,
          }));
        }
        console.error('Error adding comment:', error);
        toast({
          title: 'Error',
          description: 'No se pudo agregar el comentario',
          variant: 'destructive',
        });
      }
    }
  };

  const deleteComment = async (commentId: string) => {
    const previousExercises = [...data.exercises];
    const exerciseIndex = previousExercises.findIndex((e) =>
      e.comments?.some((comment) => comment.id === commentId)
    );

    if (exerciseIndex !== -1) {
      const updatedExercises = [...previousExercises];
      updatedExercises[exerciseIndex].comments = updatedExercises[exerciseIndex].comments.filter(
        (comment) => comment.id !== commentId
      );

      setData((prev) => ({
        ...prev,
        exercises: updatedExercises,
      }));

      try {
        await deleteCommentAction(commentId);
      } catch (error) {
        setData((prev) => ({
          ...prev,
          exercises: previousExercises,
        }));
        console.error('Error deleting comment:', error);
        toast({
          title: 'Error',
          description: 'No se pudo eliminar el comentario',
          variant: 'destructive',
        });
      }
    }
  };

  return {
    newComment,
    setNewComment,
    addComment,
    deleteComment,
  };
}
