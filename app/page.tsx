import { format } from 'date-fns';
import { ptBR as locale } from 'date-fns/locale';
import Image from 'next/image';
import Link from 'next/link';
import { getServerSession } from 'next-auth';

import BarbershopItem from '@/app/_components/barbershopItem';
import BookingItem from '@/app/_components/bookingItem';
import Header from '@/app/_components/header';
import SectionName from '@/app/_components/sectionName';
import { Button } from '@/app/_components/ui/button';
import { quickSearchOptions } from '@/app/_constants/search';
import { db } from '@/app/_lib/prisma';

import SearchBar from './_components/serachBar';
import { authOptions } from './_lib/auth';

const Home = async () => {
  const session = await getServerSession(authOptions);
  const barbershops = await db.barbershop.findMany({});
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: 'desc',
    },
  });

  const confirmedBookings = session?.user
    ? await db.booking.findMany({
        where: {
          userId: session?.user?.id,
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
      })
    : [];

  return (
    <div className=''>
      <Header />

      <div className='p-5'>
        <h2 className='text-xl font-bold'>
          {session?.user ? `Olá ${session.user.name}!` : 'Olá'}
        </h2>
        <p className='capitalize'>
          {format(new Date(), "eeee, dd 'de' MMMM", { locale })}
        </p>

        <div className='mt-6'>
          <SearchBar />
        </div>

        <div className='mt-6 flex scrollbar-none gap-3 overflow-x-scroll'>
          {quickSearchOptions.map(option => (
            <Button
              key={option.title}
              className='gap-2'
              variant='secondary'
              render={<Link href={`/barbershops?service=${option.title}`} />}
              nativeButton={false}>
              <Image
                src={option.imageUrl}
                width={16}
                height={16}
                alt={option.title}
              />
              {option.title}
            </Button>
          ))}
        </div>

        <div className='relative mt-6 h-37.5 w-full'>
          <Image
            src='/banner-01.png'
            alt='Agende nos melhores com FSW Barber'
            loading='eager'
            fill
            className='rounded-xl object-cover'
          />
        </div>

        <SectionName title='Agendamentos' />

        <div className='flex scrollbar-none gap-3 overflow-x-auto'>
          {confirmedBookings.map(booking => (
            <BookingItem key={booking.id} booking={booking} />
          ))}
        </div>

        <SectionName title='recomendados' />

        <div className='flex scrollbar-none gap-4 overflow-auto'>
          {barbershops.map(barbershop => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <SectionName title='Populares' />

        <div className='flex scrollbar-none gap-4 overflow-auto'>
          {popularBarbershops.map(barbershop => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
