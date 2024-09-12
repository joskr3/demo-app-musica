import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import type { CardMusicProps } from "@/interfaces/ICardMusic"


const CardMusic = ({ url, titulo, subtitulo, width = 200, height = 200 }: CardMusicProps) => {
  return (
    <Card>
      <CardContent>
        <img alt="imagen" src={url} width={width} height={height} className="rounded-lg" />
      </CardContent>
      <CardFooter className="flex flex-col gap-3 my-4 mx-auto">
        <h3 className="font-semibold">{titulo}</h3>
        <p className="font-thin">{subtitulo}</p>
      </CardFooter>
    </Card>
  )
}

export default CardMusic
