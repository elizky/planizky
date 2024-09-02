import { auth } from '@/auth';
import DashboardComponent from '@/components/Dashboard/Dashboard';
import EmptyDashboard from '@/components/Dashboard/EmptyDashboard';
import { dataMock } from '@/lib/dataMock';
import { TrainingDay } from '@/types/types';

const page = async () => {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  const data: TrainingDay[] = [];

  return (
    <div className='container mx-auto p-4'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-8'>
        Welcome to Planizky {session.user.name}
      </h1>
      {data.length > 0 ? <DashboardComponent data={data} /> : <EmptyDashboard />}
    </div>
  );
};

export default page;
