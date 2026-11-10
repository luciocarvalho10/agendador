'use server';

import { endOfDay, startOfDay } from 'date-fns';

import { db } from '../_lib/prisma';

interface GetBookingsProps {
  date: Date;
  serviceId: string;
}

export const getBookings = async ({ date, serviceId }: GetBookingsProps) =>
  await db.booking.findMany({
    where: {
      date: {
        lte: endOfDay(date),
        gte: startOfDay(date),
      },
    },
  });
