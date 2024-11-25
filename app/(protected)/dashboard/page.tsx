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

  const data = await getUserPlans(session.user.email);
  console.log('data', data);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-8'>
        Welcome {session.user.name}
      </h1>
      {data ? <DashboardComponent data={data} /> : <EmptyDashboard />}
    </div>
  );
};

export default page;
