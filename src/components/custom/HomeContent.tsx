import cards from "@/lib/data"
import SectionCarousel from "./SectionCarousel"

const HomeContent = () => {
  return (
    <div className="w-full mx-auto my-4 p-2">
      <SectionCarousel titulo="Escuchar Ahora" descripcion="Una lista actualizada para ti" cards={cards} anchoParaImagenes={300} altoParaImagenes={500} />
      <SectionCarousel titulo="Mis Albumes Favoritos" descripcion="Los albumes mas escuchados" cards={cards} anchoParaImagenes={200} altoParaImagenes={300} />
    </div>
  )
}

export default HomeContent
