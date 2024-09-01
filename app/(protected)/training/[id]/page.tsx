import TrainingDayComponent from '@/components/TrainingDay/TrainingDayComponent';

export default function Page({ params }: { params: { id: string } }) {
  return <TrainingDayComponent trainingDay={params.id} />;
}
