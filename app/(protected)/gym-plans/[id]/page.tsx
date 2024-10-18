import EditPlanPage from '@/components/Plan/Edit/EditPlan';
import React from 'react';

export default function Page({ params }: { params: { id: string } }) {
  return <EditPlanPage params={params} />;
}
