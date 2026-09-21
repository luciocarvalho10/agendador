import type { Barbershop } from "@/prisma/generated/prisma/client"
import { Card, CardContent } from "./ui/card"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { StarIcon } from "lucide-react"
import Link from "next/link"

interface BarbershopItemProps {
  barbershop: Barbershop
}

const BarbershopItem = ({ barbershop }: BarbershopItemProps) => {
  return (
    <Card className="min-w-39.75 p-1">
      <CardContent className="p-0">
        <div className="relative h-39.75 w-full">
          <Image
            loading="eager"
            fill
            sizes="(max-width: 640px) 160px, (max-width: 1024px) 200px, 240px"
            className="rounded-lg object-cover"
            src={barbershop.imageUrl}
            alt={barbershop.name}
          />

          <Badge
            variant="secondary"
            className="absolute top-2 left-2 flex space-x-1"
          >
            <StarIcon size={12} className="fill-primary text-primary" />
            <p className="text-xs font-semibold">5,0</p>
          </Badge>
        </div>

        <div className="px-1 py-3">
          <h3 className="truncate font-semibold">{barbershop.name}</h3>
          <p className="truncate text-sm text-gray-400">{barbershop.address}</p>
          <Button variant="secondary" className="mt-3 w-full" aschild="true">
            <Link href={`/barbershops/${barbershop.id}`}>Reservar</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default BarbershopItem
