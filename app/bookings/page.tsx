import { notFound } from 'next/navigation';
import { getServerSession } from 'next-auth';

import BookingItem from '../_components/bookingItem';
import Header from '../_components/header';
import SectionName from '../_components/sectionName';
import { authOptions } from '../_lib/auth';
import { db } from '../_lib/prisma';

const Bookings = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    // TODO MOSTRAR POP-UP DE LOGIN
    return notFound();
  }

  const confirmedBookings = await db.booking.findMany({
    where: {
      userId: session.user?.id,
      date: {
        gte: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: 'asc',
    },
  });
  const concludedBookings = await db.booking.findMany({
    where: {
      userId: session.user?.id,
      date: {
        lt: new Date(),
      },
    },
    include: {
      service: {
        include: {
          barbershop: true,
        },
      },
    },
    orderBy: {
      date: 'desc',
    },
  });

  return (
    <>
      <Header />

      <div className='space-y-3 p-5'>
        <h1 className='text-xl font-bold'>Agendamentos</h1>

        <SectionName title='Configrmados' />

        {confirmedBookings.map(booking => (
          <BookingItem key={booking.id} booking={booking} />
        ))}

        <SectionName title='Concluídos' />

        {concludedBookings.map(booking => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </div>
    </>
  );
};

export default Bookings;
