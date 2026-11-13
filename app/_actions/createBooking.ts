'use server';

import { revalidatePath } from 'next/cache';
import { getServerSession } from 'next-auth';

import { authOptions } from '../_lib/auth';
import { db } from '../_lib/prisma';

interface CreateBookingParams {
  date: Date;
  serviceId: string;
}

export const createBooking = async ({
  date,
  serviceId,
}: CreateBookingParams) => {
  const data = await getServerSession(authOptions);

  if (!data) {
    throw new Error('Usuário não autenticado!');
  }

  await db.booking.create({
    data: {
      date,
      serviceId,
      userId: data.user?.id,
    },
  });

  revalidatePath('/barbershops/[id]');
};
