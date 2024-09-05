import { Controller } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import { Button } from '../ui/button';
import { Edit2 } from 'lucide-react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import ExerciseFields from './ExerciseFields';

export default function TrainingDaysOverview({
  trainingDayFields,
  control,
}: {
  trainingDayFields: any;
  control: any;
}) {
  return (
    <div className='space-y-4'>
      <h2 className='text-2xl font-bold'>Training Days Overview</h2>
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3'>
        {trainingDayFields.map((field: any, index: number) => (
          <TrainingDayCard key={field.id} index={index} control={control} />
        ))}
      </div>
    </div>
  );
}

function TrainingDayCard({ index, control }: { index: number; control: any }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Training Day {index + 1}</CardTitle>
      </CardHeader>
      <CardContent>
        <Controller
          name={`trainingDays.${index}.title`}
          control={control}
          render={({ field }) => (
            <p>
              <strong>Title:</strong> {field.value || 'Not set'}
            </p>
          )}
        />
        <Controller
          name={`trainingDays.${index}.type`}
          control={control}
          render={({ field }) => (
            <p>
              <strong>Type:</strong> {field.value || 'Not set'}
            </p>
          )}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button className='mt-2'>
              <Edit2 className='mr-2 h-4 w-4' />
              Edit Day
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Training Day {index + 1}</DialogTitle>
            </DialogHeader>
            <TrainingDayForm nestIndex={index} control={control} />
            <DialogFooter>
              <DialogClose asChild>
                <Button>Save</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}

function TrainingDayForm({ nestIndex, control }: { nestIndex: number; control: any }) {
  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor={`trainingDays.${nestIndex}.title`}>Title</Label>
        <Controller
          name={`trainingDays.${nestIndex}.title`}
          control={control}
          render={({ field }) => <Input {...field} placeholder='Leg Day' className='w-full' />}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor={`trainingDays.${nestIndex}.type`}>Type</Label>
        <Controller
          name={`trainingDays.${nestIndex}.type`}
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select training type' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='strength'>Strength</SelectItem>
                <SelectItem value='hypertrophy'>Hypertrophy</SelectItem>
                <SelectItem value='endurance'>Endurance</SelectItem>
                <SelectItem value='cardio'>Cardio</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor={`trainingDays.${nestIndex}.description`}>Description</Label>
        <Controller
          name={`trainingDays.${nestIndex}.description`}
          control={control}
          render={({ field }) => (
            <Textarea {...field} placeholder='Focus on compound movements...' className='w-full' />
          )}
        />
      </div>
    </div>
  );
}
