import { Button } from "./ui/button"
import { CalendarIcon, HomeIcon, LogInIcon, LogOutIcon } from "lucide-react"
import Image from "next/image"
import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { quickSearchOptions } from "../_constants/search"
import { Avatar, AvatarImage } from "./ui/avatar"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"

const SidebarSheet = () => {
  return (
    <SheetContent className="overflow-y-auto">
      <SheetHeader>
        <SheetTitle className="text-left">Menu</SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-3 border-b border-solid p-5 pt-0">
        <h2 className="font-bold">Olá, faça seu login!</h2>

        <Dialog>
          <DialogTrigger render={<Button size="icon" />}>
            <LogInIcon />
          </DialogTrigger>

          <DialogContent className="w-[98%] text-center">
            <DialogHeader>
              <DialogTitle>Faça seu login na plataforma</DialogTitle>

              <DialogDescription>
                Conecte-se usando sua conta do Google
              </DialogDescription>
            </DialogHeader>

            <Button variant="outline" className="gap-2 font-bold">
              <Image
                alt="Fazer login com Google"
                src="/google.svg"
                width={18}
                height={18}
              />
              Google
            </Button>
          </DialogContent>
        </Dialog>

        {/* <Avatar>
          <AvatarImage src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80" />
        </Avatar>

        <div>
          <p className="font-bold">LPC NCA</p>
          <p className="text-xs">lpc.nca@dev.com</p>
        </div> */}
      </div>

      <div className="flex flex-col gap-2 border-b border-solid p-5 pt-0">
        <SheetClose
          className="flex"
          render={
            <Button
              className="justify-start gap-2"
              variant="ghost"
              render={<Link href="/" />}
              nativeButton={false}
            />
          }
          nativeButton={false}
        >
          <HomeIcon size={18} />
          Início
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
  )
}

export default SidebarSheet
