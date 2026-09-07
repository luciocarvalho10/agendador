import { Card, CardContent } from "./ui/card"

const Footer = () => {
  return (
    <footer>
      <Card>
        <CardContent className="px-5 py-6">
          <p className="text-sm text-gray-400">
            &copy; 2026 Copyrigth <span className="font-bold">AGENDADOR</span>
          </p>
        </CardContent>
      </Card>
    </footer>
  )
}

export default Footer
