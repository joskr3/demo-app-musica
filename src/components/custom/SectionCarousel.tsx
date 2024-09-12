import type { CardMusicProps } from "@/interfaces/ICardMusic"
import CardMusic from "./CardMusic"

interface Props {
  titulo: string
  descripcion: string
  cards: CardMusicProps[]
}

const SectionCarousel = ({ titulo, descripcion, cards }: Props) => {
  return (
    <div className="flex flex-col gap-4">
      <h1>{titulo}</h1>
      <p>{descripcion}</p>
      <div className="flex gap-10 overflow-x-auto  max-w-full">
        {
          cards.map((card, index) =>
            <CardMusic key={index} url={card.url} titulo={card.titulo} subtitulo={card.subtitulo} />
          )
        }
      </div>
    </div>
  )
}

export default SectionCarousel
