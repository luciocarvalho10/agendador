import SectionName from "./sectionName"
import { Avatar, AvatarImage } from "./ui/avatar"
import { Badge } from "./ui/badge"
import { Card, CardContent } from "./ui/card"

const BookingItem = () => {
  return (
    <>
      <SectionName title="Agendamentos" />

      <Card>
        <CardContent className="flex justify-between">
          <div className="flex flex-col gap-2 py-5">
            <Badge>Confirmado</Badge>
            <h3 className="font-semibold">Corte de Cabelo</h3>

            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/vercel.svg" />
              </Avatar>
              <p className="text-sm">Barbearia FSW</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center border-l-2 border-solid px-5">
            <p className="text-sm">Agosto</p>
            <p className="text-2xl">22</p>
            <p className="text-sm">19:00</p>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BookingItem
