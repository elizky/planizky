import { auth } from '@/auth';
import PlanPage from '@/components/Plan/Plan';
import { getUserPlans } from '@/lib/services/planService';

const MyPlans = async () => {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }
  if (!session.user.email) {
    return <div>Not allowed</div>;
  }

  const data = await getUserPlans(session.user.email);
  return <PlanPage plans={data} />;
};

export default MyPlans;
