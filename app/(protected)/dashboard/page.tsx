import { auth } from '@/auth';
import DashboardComponent from '@/components/Dashboard/Dashboard';

const page = async () => {
  const session = await auth();

  if (!session) {
    return <div>Not authenticated</div>;
  }

  return <DashboardComponent />;
};

export default page;
