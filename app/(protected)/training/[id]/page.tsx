import TrainingDayComponent from '@/components/TrainingDay/TrainingDayComponent';
import { getTrainingDayById } from '@/lib/services/trainingDayService';
import { TrainingDay } from '@/types/types';

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getTrainingDayById(params.id);
  console.log('data =========>', data);
  const typedData = data as TrainingDay;
  if (data) {
    return <TrainingDayComponent data={typedData} />;
  }
}
