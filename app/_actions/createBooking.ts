'use server';

import { db } from '../_lib/prisma';

interface CreateBookingParams {
  date: Date;
  serviceId: string;
  userId: string;
}

export const createBooking = async ({
  date,
  serviceId,
  userId,
}: CreateBookingParams) =>
  await db.booking.create({
    data: {
      date,
      userId,
      serviceId,
    },
  });
