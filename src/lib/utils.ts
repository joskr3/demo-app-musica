import { useMutation } from "@tanstack/react-query";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// const url = 'http://localhost:8000'

// Function to GET data -> obtiene los datos de la API
async function getData<T>(url: string, endpoint: string): Promise<T[]> {
  try {
    const response = await fetch(`${url}/${endpoint}`);
    if (!response.ok) {
      throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
    }
    const data = (await response.json()) as T[];
    return data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return [];
  }
}

// Function to POST data
async function createData<T>(url: string, endpoint: string, data: Omit<T, 'id'>): Promise<T | null> {
  try {
    const response = await fetch(`${url}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error creating in ${endpoint}: ${response.statusText}`);
    }
    const newData = (await response.json()) as T;
    return newData;
  } catch (error) {
    console.error(`Error creating in ${endpoint}:`, error);
    return null;
  }
}


// Function to PUT data
async function updateData<T extends { id: number }>(
  url: string,
  endpoint: string,
  data: T
): Promise<T | null> {
  try {
    const response = await fetch(`${url}/${endpoint}/${data.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Error updating in ${endpoint}: ${response.statusText}`);
    }
    const updatedData = (await response.json()) as T;
    return updatedData;
  } catch (error) {
    console.error(`Error updating in ${endpoint}:`, error);
    return null;
  }
}


export {
  getData,
  createData,
  updateData
}
