import { format, isFuture } from 'date-fns';
import { ptBR as locale } from 'date-fns/locale';

import { Prisma } from '@/prisma/generated/prisma/client';

import servicePriceDecimalToNumber from '../_lib/servicePriceDecimalToNumber';
import { Avatar, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import { Card, CardContent } from './ui/card';

interface BookingItemProps {
  booking: Prisma.BookingGetPayload<{
    include: {
      service: {
        include: {
          barbershop: true;
        };
      };
    };
  }>;
}

const BookingItem = async ({ booking }: BookingItemProps) => {
  const { barbershop, ...service } = {
    ...booking.service,
    ...servicePriceDecimalToNumber(booking.service),
  };
  const isConfirmed = isFuture(booking.date);

  const formatedDate = (type: string) => format(booking.date, type, { locale });

  return (
    <>
      <Card className='min-w-[90%]'>
        <CardContent className='flex justify-between'>
          <div className='flex flex-col gap-2 py-5'>
            <Badge
              className='w-fit'
              variant={isConfirmed ? 'default' : 'secondary'}>
              {isConfirmed ? 'Confirmado' : 'Finalizado'}
            </Badge>
            <h3 className='font-semibold'>{service?.name}</h3>

            <div className='flex items-center gap-2'>
              <Avatar className='h-6 w-6'>
                <AvatarImage src={barbershop.imageUrl} />
              </Avatar>
              <p className='text-sm'>{barbershop?.name}</p>
            </div>
          </div>

          <div className='flex flex-col items-center justify-center border-l-2 border-solid px-5 capitalize'>
            <p className='text-sm'>{formatedDate('MMMM')}</p>
            <p className='text-2xl'>{formatedDate('dd')}</p>
            <p className='text-sm'>{formatedDate('HH:mm')}</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default BookingItem;
