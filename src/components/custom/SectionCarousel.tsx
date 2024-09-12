import type { CardMusicProps } from "@/interfaces/ICardMusic"
import CardMusic from "./CardMusic"
import { Separator } from "../ui/separator"


interface Props {
  titulo: string
  descripcion: string
  cards: CardMusicProps[]
}

const SectionCarousel = ({ titulo, descripcion, cards }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl md:text-3xl font-extralight">{titulo}</h1>
      <p className="font-extralight">{descripcion}</p>
      <Separator/>
      <div className="flex gap-2 overflow-x-auto  max-w-full">
        {
          cards.map((card, index) =>
            <CardMusic key={index} url={card.url} titulo={card.titulo} subtitulo={card.subtitulo} />
          )
        }
      </div>
      <Separator />
    </div>
  )
}

export default SectionCarousel
