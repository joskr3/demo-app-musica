import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { createData } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import type { Song } from '@/interfaces';

const songSchema = z.object({
  id: z.number(),
  title: z.string().min(1, 'El título es requerido'),
  description: z.string().min(1, 'La descripción es requerida'),
  artwork_url: z.string().url('Debe ser una URL válida'),
});

type SongFormData = z.infer<typeof songSchema>;

const CreateSongForm: React.FC = () => {
  // const { createSong } = useContext(AppContext);
  // esta mutacion creará una  canción en la API(backend) -> POST - CREACION DE NUEVAS CANCIONES , USANDO  TANSTACK QUERY
  const mutationCrearData = useMutation({
    mutationKey: ['createSong'],
    mutationFn: (data: Song) => createData<Song>('http://localhost:8000/', 'songs', data)
  })

  const form = useForm<SongFormData>({
    resolver: zodResolver(songSchema),
    defaultValues: {
      id: 2345678190,
      title: '',
      description: '',
      artwork_url: '',
    },
  });

  const onSubmit = async (values: SongFormData) => {
    await mutationCrearData.mutateAsync(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título</FormLabel>
              <FormControl>
                <Input placeholder="Título de la canción" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Input placeholder="Descripción de la canción" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="artwork_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL de la imagen</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/imagen.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Crear Canción</Button>
      </form>
    </Form>
  );
};

export default CreateSongForm;
