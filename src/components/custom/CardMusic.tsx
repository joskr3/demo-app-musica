// src/components/custom/CardMusic.tsx
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { motion } from 'framer-motion';

interface CardMusicProps {
  url: string;
  titulo: string;
  subtitulo: string;
  width?: number;
  height?: number;
}

const CardMusic: React.FC<CardMusicProps> = ({ url, titulo, subtitulo, width = 200, height = 200 }) => {
  return (
    <Card>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <CardContent>
          <img alt="imagen" src={url} width={width} height={height} className="rounded-lg" />
        </CardContent>
      </motion.div>
      <CardFooter className="flex flex-col gap-3 my-4 mx-auto">
        <h3 className="font-semibold">{titulo}</h3>
        <p className="font-thin">{subtitulo}</p>
      </CardFooter>
    </Card>
  );
};

export default CardMusic;
