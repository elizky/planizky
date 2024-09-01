import { auth } from '@/auth';
import DashboardComponent from '@/components/Dashboard/Dashboard';

const page = async () => {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return (
    <div className='container mx-auto p-4'>
      
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-8'>
        Welcome to Planizky {session.user.name}
      </h1>
      <DashboardComponent />
    </div>
  );
};

export default page;
