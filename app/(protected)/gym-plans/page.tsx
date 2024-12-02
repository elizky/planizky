import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import PlanPage from '@/components/Plan/Plan';
import { getUserPlans } from '@/lib/services/planService';
import { Plan } from '@/types/types';

const MyPlans = async () => {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  const data = await getUserPlans(session.user.email!);
  return <PlanPage plans={data as unknown as Plan[]} />;
};

export default MyPlans;
