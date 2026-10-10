const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function getProducts() {
  const response = await fetch(`${API_URL}/api/products`);

  if (!response.ok) {
    throw new Error("No se pudo cargar el catálogo.");
  }

  return response.json();
}
