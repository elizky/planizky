import { Edit2 } from 'lucide-react';
import { HelpCircle } from 'lucide-react';
import { Button } from '../../ui/button';

import { CardDescription, CardHeader, CardTitle } from '../../ui/card';

interface ExerciseHeaderProps {
  title: string;
  muscleGroup: string;
  description: string;
  onInfoClick: () => void;
  onEditClick: () => void;
}

export function ExerciseHeader({
  title,
  muscleGroup,
  description,
  onInfoClick,
  onEditClick,
}: ExerciseHeaderProps) {
  return (
    <CardHeader>
      <CardTitle className='flex items-center justify-between capitalize'>
        {title}
        <Button variant='ghost' size='icon' onClick={onInfoClick}>
          <HelpCircle className='h-4 w-4' />
        </Button>
      </CardTitle>
      <div className='flex justify-between items-center'>
        <CardDescription className='capitalize'>{muscleGroup}</CardDescription>
        <Button variant='ghost' size='icon' onClick={onEditClick}>
          <Edit2 className='h-4 w-4' />
        </Button>
      </div>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
  );
}
