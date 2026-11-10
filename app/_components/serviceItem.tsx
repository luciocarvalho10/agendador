'use client';

import { addDays, format, set } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  Barbershop,
  BarbershopService,
  Booking,
} from '@/prisma/generated/prisma/client';

import { createBooking } from '../_actions/createBooking';
import { getBookings } from '../_actions/getBookings';
import { Button } from './ui/button';
import { Calendar } from './ui/calendar';
import { Card, CardContent } from './ui/card';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from './ui/sheet';

interface ServiceItemProps {
  service: Omit<BarbershopService, 'price'> & { price: number };
  barbershop: Pick<Barbershop, 'name'>;
}

const TIME_LIST = [
  '08:00',
  '08:30',
  '09:00',
  '09:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
  '23:30',
];
const getHoursAndMinutes = (time: string) => {
  const hours = Number(time.split(':')[0]);
  const minutes = Number(time.split(':')[1]);

  return { hours, minutes };
};

const getTimeList = (bookings: Booking[]) => {
  return TIME_LIST.filter(time => {
    const { hours, minutes } = getHoursAndMinutes(time);
    const hasBookingOnTimeList = bookings.some(
      b => b.date.getHours() === hours && b.date.getMinutes() === minutes,
    );

    if (hasBookingOnTimeList) {
      return false;
    }

    return true;
  });
};

const ServiceItem = ({ service, barbershop }: ServiceItemProps) => {
  const { data } = useSession();
  const [bookingSheetIsOpen, setBookingSheetIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );
  const [dayBookings, setDayBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetch = async () => {
      if (!selectedDay) return;

      const bookings = await getBookings({
        date: selectedDay,
        serviceId: service.id,
      });

      setDayBookings(bookings);
    };

    fetch();
  }, [selectedDay, service.id]);

  const handleBookingSheetOpenChange = () => {
    setSelectedDay(undefined);
    setSelectedTime(undefined);
    setDayBookings([]);
    setBookingSheetIsOpen(false);
  };
  const handleDaySelect = (day: Date | undefined) => setSelectedDay(day);
  const handleTimeSelect = (time: string) => setSelectedTime(time);

  const handleCreateBooking = async () => {
    try {
      if (!selectedDay || !selectedTime) return;

      const { hours, minutes } = getHoursAndMinutes(selectedTime);
      const newDate = set(selectedDay, { hours, minutes });

      await createBooking({
        date: newDate,
        serviceId: service.id,
        userId: data?.user?.id,
      });

      setBookingSheetIsOpen(false);
      toast.success('Reserva criada com sucesso!');
    } catch (error) {
      console.log('Componente: ' + error);
      toast.error('Erro ao criar reserva!');
    }
  };

  return (
    <Card>
      <CardContent className='flex items-center gap-3'>
        <div className='relative max-h-27.5 min-h-27.5 max-w-27.5 min-w-27.5'>
          <Image
            loading='eager'
            src={service.imageUrl}
            alt={service.name}
            fill
            className='rounded-lg object-cover'
            sizes='auto'
          />
        </div>

        <div className='flex-1 space-y-2'>
          <h3 className='text-sm font-semibold'>{service.name}</h3>
          <p className='text-sm text-gray-400'>{service.description}</p>

          <div className='flex items-center justify-between'>
            <p className='text-primary text-sm font-bold'>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              }).format(Number(service.price))}
            </p>

            <Sheet
              open={bookingSheetIsOpen}
              onOpenChange={handleBookingSheetOpenChange}>
              <Button
                variant='secondary'
                size='sm'
                onClick={() => setBookingSheetIsOpen(true)}
                className='bg-secondary hover:bg-primary/90 rounded-lg p-2 text-sm font-semibold text-white transition-colors'>
                Reservar
              </Button>
              <SheetContent className='gap-0'>
                <SheetHeader className='items-center'>
                  <SheetTitle>Fazer Reserva</SheetTitle>
                </SheetHeader>

                <div className='flex justify-center border-b border-solid py-4'>
                  <Calendar
                    mode='single'
                    locale={ptBR}
                    selected={selectedDay}
                    onSelect={handleDaySelect}
                    disabled={{ before: addDays(new Date(), 1) }}
                    today={new Date()}
                    styles={{
                      root: {
                        width: '100%',
                        backgroundColor: 'transparent',
                        padding: '16px',
                      },
                      caption_label: {
                        width: '100%',
                        textTransform: 'capitalize',
                        textAlign: 'center',
                      },
                      weekday: {
                        width: '100%',
                        textTransform: 'capitalize',
                      },
                      day: { width: '100%' },
                      day_button: { width: '100%' },
                      button_previous: {
                        width: '32px',
                        height: '32px',
                        borderColor: 'grey',
                      },
                      button_next: {
                        width: '32px',
                        height: '32px',
                        borderColor: 'grey',
                      },
                    }}
                  />
                </div>

                {selectedDay && (
                  <div className='flex scrollbar-none gap-3 overflow-x-auto border-b border-solid p-5'>
                    {getTimeList(dayBookings).map(time => (
                      <Button
                        variant={selectedTime === time ? 'default' : 'outline'}
                        key={time}
                        className='rounded-full'
                        onClick={() => handleTimeSelect(time)}>
                        {time}
                      </Button>
                    ))}
                  </div>
                )}

                {selectedTime && selectedDay && (
                  <div className='p-5'>
                    <Card>
                      <CardContent className='space-y-3'>
                        <div className='flex items-center justify-between'>
                          <h2 className='font-bold'>{service.name}</h2>

                          <p className='text-sm font-bold'>
                            {Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            }).format(Number(service.price))}
                          </p>
                        </div>

                        <div className='flex items-center justify-between'>
                          <h2 className='text-sm text-gray-400'>Data</h2>
                          <p className='text-sm'>
                            {format(selectedDay, "d 'de' MMMM", {
                              locale: ptBR,
                            })}
                          </p>
                        </div>

                        <div className='flex items-center justify-between'>
                          <h2 className='text-sm text-gray-400'>Horário</h2>
                          <h2 className='text-sm'>{selectedTime}</h2>
                        </div>

                        <div className='flex items-center justify-between'>
                          <h2 className='text-sm text-gray-400'>Barbearia</h2>
                          <h2 className='text-sm'>{barbershop.name}</h2>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <SheetFooter className='text-px-5'>
                  <SheetClose
                    nativeButton={true}
                    render={
                      <Button
                        disabled={!selectedDay || !selectedTime}
                        type='submit'
                        onClick={handleCreateBooking}>
                        Confirmar
                      </Button>
                    }
                  />
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceItem;
