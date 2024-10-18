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
import { Plan } from '@/types/types';
import Link from 'next/link';
import { handleActivate } from '@/actions/dashboard-actions';
export default function PlanTable({ plans }: { plans: Plan[] }) {
  
  const activePlan = plans.find((plan) => plan.isActive) || plans[0];

  return (
    <Card>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>Training Days</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {plans.map((plan) => (
              <TableRow key={plan.id}>
                <TableCell className='font-medium'>{plan.title}</TableCell>
                <TableCell>{plan.description}</TableCell>
                <TableCell>
                  <Badge variant={plan.isActive ? 'default' : 'outline'}>
                    {plan.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </TableCell>
                <TableCell>{new Date(plan.startDate).toDateString()}</TableCell>
                <TableCell className='text-center'>{plan.trainingDays.length}</TableCell>
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
                      <DropdownMenuItem className='cursor-pointer'>Delete</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
