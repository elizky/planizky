import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash } from 'lucide-react';
import { Comment } from '@/types/types';

interface CommentsSectionProps {
  comments: Comment[];
  newComment: string;
  onNewCommentChange: (value: string) => void;
  onAddComment: () => void;
  onDeleteComment: (commentId: string) => void;
}

export default function CommentsSection({
  comments,
  newComment,
  onNewCommentChange,
  onAddComment,
  onDeleteComment,
}: CommentsSectionProps) {

    
  return (
    <div className='mt-4'>
      <h3 className='font-semibold mb-2'>Comentarios</h3>
      {comments?.map((comment) => (
        <div key={comment.id} className='bg-muted p-2 rounded mb-2 flex justify-between'>
          <div>
            <p className='text-sm'>{comment.content}</p>
            <p className='text-xs text-muted-foreground'>
              {new Date(comment.createdAt).toLocaleString()}
            </p>
          </div>
          <Button variant='ghost' size='icon' onClick={() => onDeleteComment(comment.id)}>
            <Trash className='h-4 w-4' />
          </Button>
        </div>
      ))}
      <div className='flex justify-between gap-2 my-4'>
        <Input
          value={newComment}
          onChange={(e) => onNewCommentChange(e.target.value)}
          placeholder='Añade un comentario...'
          className='w-3/4'
        />
        <Button onClick={onAddComment} className='w-1/4'>
          Añadir
        </Button>
      </div>
    </div>
  );
} 