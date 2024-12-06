import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import DashboardComponent from '@/components/Dashboard/Dashboard';
import EmptyDashboard from '@/components/Dashboard/EmptyDashboard';
import { getUserPlans } from '@/lib/services/planService';
import { Plan } from '@/types/types';
import { ExploreComponent } from '@/components/Dashboard/ExploreComponent';

const page = async () => {
  const session = await auth();

  if (!session) {
    redirect('/');
  }

  const data = await getUserPlans(session.user.email!);

  console.log('data', data);

  return (
    <div className='container mx-auto p-4'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-8'>
        Welcome {session.user.name}
      </h1>
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Explore Plans</h2>
        <ExploreComponent />
      </div>
      {data.length > 0 ? (
        <DashboardComponent data={data as unknown as Plan[]} />
      ) : (
        <EmptyDashboard />
      )}
    </div>
  );
};

export default page;
