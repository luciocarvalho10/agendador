import BarbershopItem from '../_components/barbershopItem';
import Header from '../_components/header';
import SectionName from '../_components/sectionName';
import SearchBar from '../_components/serachBar';
import { db } from '../_lib/prisma';

interface BarbershopsPageProps {
  searchParams: {
    search?: string;
  };
}

const BarbershopsPage = async ({ searchParams }: BarbershopsPageProps) => {
  const { search } = await searchParams;
  const barbershops = await db.barbershop.findMany({
    where: {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    },
  });

  return (
    <div>
      <Header />
      <div className='my-6 px-5'>
        <SearchBar />
      </div>
      <div className='px-5'>
        <SectionName title={`Resultados para "${search}"`} />

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
