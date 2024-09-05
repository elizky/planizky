'use server';

import { auth } from '@/auth';
import { updateActivePlan } from '@/lib/services/planService';
import { Plan } from '@/types/types';
import { revalidatePath } from 'next/cache';

export const handleActivate = async (planId: string, activatePlan: Plan) => {
  const session = await auth();

  if (!session) {
    return;
  }
  if (!session.user.email) {
    return;
  }

  await updateActivePlan(planId, { isActive: true })
    .then(() => updateActivePlan(activatePlan.id, { isActive: false }))
    .finally(() => revalidatePath('/dashboard'));
};
