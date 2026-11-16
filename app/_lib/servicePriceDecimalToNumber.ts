import { BarbershopService } from '@/prisma/generated/prisma/client';

const servicePriceDecimalToNumber = (service: BarbershopService) => ({
  ...service,
  price: service.price.toNumber(),
});

export default servicePriceDecimalToNumber;
