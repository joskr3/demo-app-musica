import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Definimos una interfaz para los argumentos que acepta la función fetcher.
// Aquí especificamos que la función recibirá un input (URL o Request) y un init opcional.
interface FetcherArgs {
  input: RequestInfo; // Puede ser una URL (string) o un objeto Request.
  init?: RequestInit; // Opcional, contiene opciones adicionales para la solicitud.
}

// Definimos la función fetcher con un tipo genérico T.
// T es el tipo de datos que esperamos que retorne la función.
// Esto nos permite tipar la respuesta JSON que recibimos al usar fetcher.
export const fetcher = async <T>(...args: [FetcherArgs['input'], FetcherArgs['init']]): Promise<T> => {
  // Usamos fetch con los argumentos recibidos.
  const response = await fetch(...args);

  // Validamos si la respuesta fue exitosa antes de intentar parsear el JSON.
  // Si la respuesta no es exitosa (status code 4xx o 5xx), lanzamos un error con el mensaje correspondiente.
  if (!response.ok) {
    throw new Error(`Error en la solicitud: ${response.statusText}`);
  }

  // Retornamos la respuesta parseada como JSON.
  // Aquí usamos el tipo genérico T, lo que nos permite especificar el tipo de datos esperado al llamar a fetcher.
  return response.json() as Promise<T>;
};
