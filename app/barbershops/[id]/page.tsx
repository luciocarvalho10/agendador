import PhoneItem from "@/app/_components/phoneItem"
import ServiceItem from "@/app/_components/serviceItem"
import { Button } from "@/app/_components/ui/button"
import { db } from "@/app/_lib/prisma"
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

const BarbarshopPage = async ({ params }) => {
  const { id } = await params
  const barbershop = await db.barbershop.findUnique({
    where: { id },
    include: { services: true },
  })

  if (!barbershop) {
    return notFound()
  }

  return (
    <div>
      <div className="relative h-62.5 w-full">
        <Image
          src={barbershop.imageUrl}
          alt={barbershop.name}
          fill
          className="object-cover"
        />

        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 left-4"
          asChild
        >
          <Link href="/">
            <ChevronLeftIcon />
          </Link>
        </Button>

        <Button
          size="icon"
          variant="secondary"
          className="absolute top-4 right-4"
          asChild
        >
          <Link href="/">
            <MenuIcon />
          </Link>
        </Button>
      </div>

      <div className="border-b border-solid p-5">
        <h1 className="mb-3 text-xl font-bold">{barbershop.name}</h1>
        <div className="mb-2 flex items-center gap-2">
          <MapPinIcon className="text-primary" size={18} />
          <p className="text-sm">{barbershop.address}</p>
        </div>

        <div className="flex items-center gap-2">
          <StarIcon className="text-primary" size={18} />
          <p className="text-sm">5,0 (499 avaliações)</p>
        </div>
      </div>

      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold text-gray-400 uppercase">Sobre nós</h2>
        <p className="text-ms text-justify">{barbershop.description}</p>
      </div>

      <div className="space-y-3 border-b border-solid p-5">
        <h2 className="text-xs font-bold text-gray-400 uppercase">Serviços</h2>
        <div className="space-y-3">
          {barbershop.services.map((service) => (
            <ServiceItem key={service.id} service={service} />
          ))}
        </div>
      </div>

      <div className="space-y-3 p-5">
        {barbershop.phones.map((phone, index) => (
          <div className="flex justify-between" key={`${index}-${phone}`}>
            <PhoneItem phone={phone} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default BarbarshopPage
