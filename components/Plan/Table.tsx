import { MoreVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useToast } from '@/components/ui/use-toast';
import { Plan } from '@/types/types';
import Link from 'next/link';
import { handleActivate } from '@/actions/dashboard-actions';
import { deletePlan } from '@/actions/plan-actions';

export default function PlanTable({ plans }: { plans: Plan[] }) {
  const { toast } = useToast();
  const activePlan = plans.find((plan) => plan.isActive) || plans[0];

  const handleDelete = async (planId: string) => {
    try {
      const result = await deletePlan(planId);

      if (result.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.error,
        });
        return;
      }

      toast({
        description: 'Plan deleted successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete plan',
      });
      console.error('Error:', error);
    }
  };

  return (
    <Card>
      <CardContent>
        <div className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className='w-[150px] md:w-auto'>Title</TableHead>
                <TableHead className='hidden md:table-cell'>Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className='hidden md:table-cell'>Start Date</TableHead>
                <TableHead className='hidden md:table-cell'>Training Days</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {plans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className='font-medium'>{plan.title}</TableCell>
                  <TableCell className='hidden md:table-cell'>{plan.description}</TableCell>
                  <TableCell>
                    <Badge variant={plan.isActive ? 'default' : 'outline'}>
                      {plan.isActive ? 'Active' : 'Inactive'}
                    </Badge>
                  </TableCell>
                  <TableCell className='hidden md:table-cell'>
                    {new Date(plan.startDate).toDateString()}
                  </TableCell>
                  <TableCell className='hidden md:table-cell text-center'>
                    {plan.trainingDays.length}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup='true' size='icon' variant='ghost'>
                          <MoreVertical className='h-4 w-4' />
                          <span className='sr-only'>Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align='end'>
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className='cursor-pointer'
                          onClick={async () => handleActivate(plan.id, activePlan)}
                        >
                          Activate
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <Link href={`/gym-plans/${plan.id}`}>
                          <DropdownMenuItem className='cursor-pointer'>Edit</DropdownMenuItem>
                        </Link>
                        <DropdownMenuItem
                          className='cursor-pointer text-destructive'
                          onClick={() => handleDelete(plan.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
