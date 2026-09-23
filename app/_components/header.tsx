import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { CalendarIcon, HomeIcon, LogOutIcon, MenuIcon } from "lucide-react"
import Image from "next/image"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"

const Header = () => {
  return (
    <Card>
      <CardContent className="flex flex-row items-center justify-between p-5">
        <Image src="/logo.png" alt="Agendador" height={18} width={120} />

        <Sheet>
          <SheetTrigger>
            {/* With button, heydration happens */}
            {/* <Button size="icon" variant="outline"> */}
            <MenuIcon />
            {/* </Button> */}
          </SheetTrigger>

          <SheetContent className="overflow-y-auto">
            <SheetHeader>
              <SheetTitle className="text-left">Menu</SheetTitle>
            </SheetHeader>

            <div className="flex items-center gap-3 border-b border-solid p-5 pt-0">
              <Avatar>
                <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" />
              </Avatar>

              <div>
                <p className="font-bold">LPC NCA</p>
                <p className="text-xs">lpc.nca@dev.com</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 border-b border-solid p-5 pt-0">
              {/* <SheetClose className="flex" asChild> */}
              <SheetClose className="flex">
                <Button className="justify-start gap-2" variant="ghost" asChild>
                  <Link
                    href="/"
                    className="flex flex-1 items-center gap-2"
                    data-slot="sheet-close"
                  >
                    <HomeIcon size={18} />
                    Início
                  </Link>
                </Button>
              </SheetClose>

              <Button className="justify-start gap-2" variant="ghost">
                <CalendarIcon size={18} />
                Agendamentos
              </Button>
            </div>

            <div className="flex flex-col gap-2 border-b border-solid p-5 pt-0">
              {quickSearchOptions.map((option) => (
                <Button
                  key={option.title}
                  className="justify-start gap-2"
                  variant="ghost"
                >
                  <Image
                    src={option.imageUrl}
                    height={18}
                    width={18}
                    alt={option.title}
                  />
                  {option.title}
                </Button>
              ))}
            </div>

            <div className="flex flex-col gap-2 p-5 pt-0">
              <Button className="justify-start gap-2" variant="ghost">
                <LogOutIcon size={18} />
                Sair da Conta
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  )
}

export default Header
