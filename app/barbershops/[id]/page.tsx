import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import PhoneItem from '@/app/_components/phoneItem';
import ServiceItem from '@/app/_components/serviceItem';
import SidebarSheet from '@/app/_components/sidebarSheet';
import { Button } from '@/app/_components/ui/button';
import { Sheet, SheetTrigger } from '@/app/_components/ui/sheet';
import { db } from '@/app/_lib/prisma';

interface BarbarshopPageProps {
  params: {
    id: string;
  };
}

const BarbarshopPage = async ({ params }: BarbarshopPageProps) => {
  const { id } = await params;
  const barbershop = await db.barbershop
    .findUnique({
      where: { id },
      include: { services: true },
    })
    .then(barbershop => {
      if (!barbershop) return;

      return {
        ...barbershop,
        services: barbershop.services.map(service => ({
          ...service,
          price: service.price.toNumber(),
        })),
      };
    });

  if (!barbershop) {
    return notFound();
  }

  return (
    <div>
      <div className='relative h-62.5 w-full'>
        <Image
          loading='eager'
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className='object-cover'
        />

        <Button
          size='icon'
          variant='secondary'
          className='absolute top-4 left-4'
          nativeButton={false}
          render={
            <Link href='/'>
              <ChevronLeftIcon />
            </Link>
          }></Button>

        <Sheet>
          <SheetTrigger
            nativeButton={true}
            render={
              <Button
                size='icon'
                variant='outline'
                className='absolute top-4 right-4'></Button>
            }>
            <MenuIcon />
          </SheetTrigger>
          <SidebarSheet />
        </Sheet>
      </div>

      <div className='border-b border-solid p-5'>
        <h1 className='mb-3 text-xl font-bold'>{barbershop.name}</h1>
        <div className='mb-2 flex items-center gap-2'>
          <MapPinIcon className='text-primary' size={18} />
          <p className='text-sm'>{barbershop.address}</p>
        </div>

        <div className='flex items-center gap-2'>
          <StarIcon className='text-primary' size={18} />
          <p className='text-sm'>5,0 (499 avaliações)</p>
        </div>
      </div>

      <div className='space-y-3 border-b border-solid p-5'>
        <h2 className='text-xs font-bold text-gray-400 uppercase'>Sobre nós</h2>
        <p className='text-ms text-justify'>{barbershop.description}</p>
      </div>

      <div className='space-y-3 border-b border-solid p-5'>
        <h2 className='text-xs font-bold text-gray-400 uppercase'>Serviços</h2>
        <div className='space-y-3'>
          {barbershop.services?.map(service => {
            return (
              <ServiceItem
                key={service.id}
                service={service}
                barbershop={barbershop}
              />
            );
          })}
        </div>
      </div>

      <div className='space-y-3 p-5'>
        {barbershop.phones.map((phone, index) => (
          <div className='flex justify-between' key={`${index}-${phone}`}>
            <PhoneItem phone={phone} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarbarshopPage;
