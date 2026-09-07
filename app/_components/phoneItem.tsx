"use client"

import { SmartphoneIcon } from "lucide-react"
import { toast } from "sonner"
import { Button } from "./ui/button"

interface PhoneItemProps {
  phone: string
}

const PhoneItem = ({ phone }: PhoneItemProps) => {
  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Telefone copaido com sucesso!")
  }

  return (
    <>
      <div className="flex items-center gap-2">
        <SmartphoneIcon />
        <div className="text-sm">{phone}</div>
      </div>

      <Button variant="outline" onClick={() => handleCopyToClipboard(phone)}>
        Copiar
      </Button>
    </>
  )
}

export default PhoneItem
