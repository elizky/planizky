import { Controller } from 'react-hook-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

export default function PlanDetails({ control, errors }: { control: any; errors: any }) {
  return (
    <div className='space-y-6'>
      <div className='space-y-2'>
        <Label htmlFor='title'>Plan Title</Label>
        <Controller
          name='title'
          control={control}
          render={({ field }) => (
            <Input {...field} id='title' placeholder='My Awesome Gym Plan' className='w-full' />
          )}
        />
        {errors.title && <p className='text-sm text-destructive'>{errors.title.message}</p>}
      </div>

      <div className='space-y-2'>
        <Label htmlFor='description'>Plan Description</Label>
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <Textarea
              {...field}
              id='description'
              placeholder='Describe your plan...'
              className='w-full'
            />
          )}
        />
      </div>

      <div className='space-y-2'>
        <Label htmlFor='trainingDaysCount'>Number of Training Days</Label>
        <Controller
          name='trainingDaysCount'
          control={control}
          render={({ field }) => (
            <Select onValueChange={field.onChange} value={field.value}>
              <SelectTrigger className='w-full'>
                <SelectValue placeholder='Select number of training days' />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 5].map((num) => (
                  <SelectItem key={num} value={num.toString()}>
                    {num} {num === 1 ? 'day' : 'days'}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.trainingDaysCount && (
          <p className='text-sm text-destructive'>{errors.trainingDaysCount.message}</p>
        )}
      </div>
    </div>
  );
}
