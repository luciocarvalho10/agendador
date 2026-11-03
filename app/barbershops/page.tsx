import BarbershopItem from '../_components/barbershopItem';
import Header from '../_components/header';
import SectionName from '../_components/sectionName';
import SearchBar from '../_components/serachBar';
import { db } from '../_lib/prisma';

interface BarbershopsPageProps {
  searchParams: {
    // search?: string;
    title?: string;
    service?: string;
  };
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const { title, service } = await searchParams;
  const barbershops = await db.barbershop.findMany({
    where: {
      OR: [
        title
          ? {
              name: {
                contains: title,
                mode: 'insensitive',
              },
            }
          : {},
        service
          ? {
              services: {
                some: {
                  name: {
                    contains: service,
                    mode: 'insensitive',
                  },
                },
              },
            }
          : {},
      ],
    },
  });

  return (
    <div>
      <Header />
      <div className='my-6 px-5'>
        <SearchBar />
      </div>
      <div className='px-5'>
        <SectionName title={`Resultados para "${title || service}"`} />

        <div className='grid grid-cols-2 gap-4'>
          {barbershops.map(barbershop => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BarbershopsPage;
