const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateProductInput(body = {}) {
  const { name, price, description, category, imageUrl } =
    body && typeof body === "object" ? body : {};

  if (!name || !description || !category) {
    return {
      error: "Nombre, descripción y categoría son obligatorios.",
    };
  }

  const data = {
    name: String(name).trim(),
    description: String(description).trim(),
    category: String(category).trim(),
    imageUrl: String(imageUrl || "").trim(),
    price: Number(price ?? 0),
  };

  if (!data.name || !data.description || !data.category) {
    return {
      error: "Los campos principales no pueden estar vacíos.",
    };
  }

  if (!Number.isFinite(data.price) || data.price < 0) {
    return {
      error: "El precio debe ser un número válido.",
    };
  }

  return { data };
}

export function validateContactInput(body = {}) {
  const { name, email, phone = "", message } =
    body && typeof body === "object" ? body : {};

  if (!name || !email || !message) {
    return {
      error: "Nombre, correo y mensaje son obligatorios.",
    };
  }

  const data = {
    name: String(name).trim(),
    email: String(email).trim().toLowerCase(),
    phone: String(phone || "").trim(),
    message: String(message).trim(),
  };

  if (data.name.length < 2) {
    return { error: "Escribe un nombre válido." };
  }

  if (!emailPattern.test(data.email)) {
    return { error: "Ingresa un correo válido." };
  }

  if (data.message.length < 12) {
    return { error: "Cuéntanos un poco más sobre tu proyecto." };
  }

  return { data };
}
