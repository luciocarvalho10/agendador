import { SearchIcon } from "lucide-react"
import Header from "@/app/_components/header"
import { Button } from "@/app/_components/ui/button"
import { Input } from "@/app/_components/ui/input"
import Image from "next/image"
import { Card, CardContent } from "@/app/_components/ui/card"
import { db } from "@/app/_lib/prisma"
import BarbershopItem from "@/app/_components/barbershopItem"
import { quickSearchOptions } from "@/app/_constants/search"
import BookingItem from "@/app/_components/bookingItem"

const Home = async () => {
  const barbershops = await db.barbershop.findMany({})
  const popularBarbershops = await db.barbershop.findMany({
    orderBy: {
      name: "desc",
    },
  })

  return (
    <div className="">
      <Header />

      <div className="p-5">
        <h2 className="text-xl font-bold">Olá, Lucio!</h2>
        <p>Sabado, 22 de agosto.</p>

        <div className="mt-6 flex items-center gap-2">
          <Input placeholder="Faça a sua busca..." />
          <Button>
            <SearchIcon />
          </Button>
        </div>

        <div className="mt-6 flex scrollbar-none gap-3 overflow-x-scroll">
          {quickSearchOptions.map((option) => (
            <Button key={option.title} className="gap-2" variant="secondary">
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

        <div className="relative mt-6 h-37.5 w-full">
          <Image
            src="/banner-01.png"
            alt="Agende nos melhores com FSW Barber"
            loading="eager"
            fill
            className="rounded-xl object-cover"
          />
        </div>

        <BookingItem />

        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Recomendados
        </h2>

        <div className="flex scrollbar-none gap-4 overflow-auto">
          {barbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>

        <h2 className="mt-6 mb-3 text-xs font-bold text-gray-400 uppercase">
          Populares
        </h2>

        <div className="flex scrollbar-none gap-4 overflow-auto">
          {popularBarbershops.map((barbershop) => (
            <BarbershopItem key={barbershop.id} barbershop={barbershop} />
          ))}
        </div>
      </div>

      <footer>
        <Card>
          <CardContent className="px-5 py-6">
            <p className="text-sm text-gray-400">
              &copy; 2026 Copyrigth <span className="font-bold">AGENDADOR</span>
            </p>
          </CardContent>
        </Card>
      </footer>
    </div>
  )
}

export default Home
