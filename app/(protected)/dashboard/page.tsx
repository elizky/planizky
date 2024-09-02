import { auth } from '@/auth';
import DashboardComponent from '@/components/Dashboard/Dashboard';
import EmptyDashboard from '@/components/Dashboard/EmptyDashboard';
import { getUserPlans } from '@/lib/services/planService';

const page = async () => {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }
  if (!session.user.email) {
    return <div>Not allowed</div>;
  }

  const data = await getUserPlans('user1@example.com');
  console.log('data', data);
  const currentPlan = data.find((plan) => plan.isActive) || data[0];
  console.log('currentPlan', currentPlan);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-8'>
        Welcome to Planizky {session.user.name}
      </h1>
      {currentPlan ? <DashboardComponent data={currentPlan} /> : <EmptyDashboard />}
    </div>
  );
};

export default page;
