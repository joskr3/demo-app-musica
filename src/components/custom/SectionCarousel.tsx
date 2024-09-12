import type { CardMusicProps } from "@/interfaces/ICardMusic"
import CardMusic from "./CardMusic"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"

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
      <Carousel>
        <CarouselContent>
          <>
            {
              cards.map((card, index) =>
                (<CarouselItem key={index}>
                  <CardMusic url={card.url} titulo={card.titulo} subtitulo={card.subtitulo} />
                </CarouselItem>)
              )
            }
          </>
        </CarouselContent>
      </Carousel>
    </div>
  )
}

export default SectionCarousel
