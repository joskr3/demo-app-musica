// src/components/custom/SectionCarousel.tsx
import CardMusic from './CardMusic';

interface CardMusicProps {
  url: string;
  titulo: string;
  subtitulo: string;
  width?: number;
  height?: number;
}

interface Props {
  titulo: string;
  descripcion: string;
  anchoParaImagenes: number;
  altoParaImagenes: number;
  cards: CardMusicProps[];
}

const SectionCarousel: React.FC<Props> = ({ titulo, descripcion, cards, anchoParaImagenes, altoParaImagenes }) => {
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl md:text-3xl font-extralight">{titulo}</h1>
      <p className="font-extralight">{descripcion}</p>
      <div className="flex gap-2 overflow-x-auto max-w-full">
        {cards.map((card, index) => (
          <CardMusic
            key={index}
            url={card.url}
            titulo={card.titulo}
            subtitulo={card.subtitulo}
            width={anchoParaImagenes}
            height={altoParaImagenes}
          />
        ))}
      </div>
    </div>
  );
};

export default SectionCarousel;
