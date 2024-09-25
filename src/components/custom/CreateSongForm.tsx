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

import { url } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import type { Song } from '@/interfaces';

const songSchema = z.object({
  titulo: z.string().min(1, 'El título es requerido'),
  descripcion: z.string().min(1, 'La descripción es requerida'),
  url_portada: z.string().url('Debe ser una URL válida')
});

type SongFormData = z.infer<typeof songSchema>;

const CreateSongForm: React.FC = () => {
  const mutation = useMutation({
    mutationFn: (cancion: Omit<Song, 'id'>) => {
      return fetch(
        `${url}/canciones`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(cancion),
        }
      )
    },
  })



  const form = useForm<SongFormData>({
    resolver: zodResolver(songSchema),
    defaultValues: {
      titulo: '',
      descripcion: '',
      url_portada: ''
    },
  });

  const onSubmit = async (values: SongFormData) => {
    await mutation.mutateAsync(values);
    form.reset();
  };


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="titulo"
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
          name="descripcion"
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
          name="url_portada"
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
        <Button type="submit">Crear canción</Button>
      </form>
    </Form>
  );
};

export default CreateSongForm;
