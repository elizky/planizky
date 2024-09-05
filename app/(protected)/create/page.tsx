import PlanComponent from '@/components/Create/PlanComponent';

const CreatePlan = () => {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl pb-8'>
        Create Gym Training Plan
      </h1>
      <PlanComponent />
    </div>
  );
};

export default CreatePlan;
