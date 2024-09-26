// src/components/LoginPage.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Usuario } from "@/interfaces";
import { url } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { useAuth } from '@/context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();

  // Estado local para manejar errores de autenticación
  const [error, setError] = useState<string | null>(null);

  // Crear la mutación para el login
  const mutation = useMutation({
    mutationKey: ['login'], // Clave única para la mutación
    mutationFn: async (nuevoUsuario: Usuario) => {
      const response = await fetch(
        `${url}/login`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(nuevoUsuario),
        }
      );
      if (!response.ok) {
        throw new Error('Error en la autenticación'); // Error lanzado si la respuesta no es exitosa
      }
      return response.json(); // Devolver los datos en formato JSON
    },
    onSuccess: (data) => {
      login(data.message); // Llamar a la función login del contexto
      setError(null); // Limpiar cualquier error anterior
    },
    onError: (error) => {
      if (error instanceof Error) {
        setError(error.message); // Establecer el mensaje de error
      } else {
        setError('Error desconocido en la autenticación'); // Error genérico
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const nuevoUsuario: Usuario = {
      nombre_usuario: formData.get('nombre_usuario') as string,
      password: formData.get('password') as string,
    };
    mutation.mutate(nuevoUsuario);
  };

  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="w-full lg:grid h-dvh lg:grid-cols-2">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <Label htmlFor="nombre_usuario">Username</Label>
              <Input
                id="nombre_usuario"
                name="nombre_usuario"
                type="text"
                placeholder="Nombre usuario"
                value={user}
                onChange={(e) => setUser(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>} {/* Mostrar el mensaje de error */}
            <Button type="submit" className="w-full" disabled={mutation.isPending}>
              {mutation.isPending ? 'Loading...' : 'Login'}
            </Button>
          </form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <img
          src="/src/assets/portada.jpg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
};

export default LoginPage;
