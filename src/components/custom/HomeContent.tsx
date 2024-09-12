import type { CardMusicProps } from "@/interfaces/ICardMusic"
import SectionCarousel from "./SectionCarousel"

const HomeContent = () => {

  const cards: CardMusicProps[] = [
    {
      url: "https://cdn.pixabay.com/photo/2024/04/12/23/11/nature-8692760_1280.jpg",
      titulo: "Titulo general 1",
      subtitulo: "Un subtitulo de demostracion"
    },
    {
      url: "https://cdn.pixabay.com/photo/2024/04/12/23/11/nature-8692760_1280.jpg",
      titulo: "Titulo general 2",
      subtitulo: "Un subtitulo de demostracion"
    },
    {
      url: "https://cdn.pixabay.com/photo/2024/04/12/23/11/nature-8692760_1280.jpg",
      titulo: "Titulo general 3",
      subtitulo: "Un subtitulo de demostracion"
    },
    {
      url: "https://cdn.pixabay.com/photo/2024/04/12/23/11/nature-8692760_1280.jpg",
      titulo: "Titulo general 4",
      subtitulo: "Un subtitulo de demostracion"
    }
  ]

  return (
    <div className="w-full mx-auto my-4 p-2">
      <SectionCarousel titulo="Escuchar Ahora" descripcion="Una lista actualizada para ti" cards={cards} />
    </div>
  )
}

export default HomeContent
