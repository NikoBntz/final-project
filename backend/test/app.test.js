import assert from "node:assert/strict";
import { after, before, test } from "node:test";
import { createApp } from "../app.js";
import {
  validateContactInput,
  validateProductInput,
} from "../utils/validation.js";

let server;
let baseUrl;
const app = createApp({ frontendUrl: "http://localhost:5173" });

before(async () => {
  server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

after(async () => {
  await new Promise((resolve, reject) => {
    server.close((error) => (error ? reject(error) : resolve()));
  });
});

test("returns API status at the root route", async () => {
  const response = await fetch(`${baseUrl}/`);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), {
    message: "Levinor API is running",
  });
});

test("reports degraded health when MongoDB is disconnected", async () => {
  const response = await fetch(`${baseUrl}/health`);
  const body = await response.json();

  assert.equal(response.status, 503);
  assert.equal(body.ok, false);
  assert.equal(body.status, "degraded");
});

test("returns JSON for unknown routes", async () => {
  const response = await fetch(`${baseUrl}/does-not-exist`);

  assert.equal(response.status, 404);
  assert.deepEqual(await response.json(), {
    message: "Ruta no encontrada.",
  });
});

test("returns 400 for malformed JSON", async () => {
  const response = await fetch(`${baseUrl}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: '{"name":',
  });

  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    message: "El cuerpo JSON no es válido.",
  });
});

test("blocks database routes while MongoDB is unavailable", async () => {
  const response = await fetch(`${baseUrl}/api/products`);

  assert.equal(response.status, 503);
  assert.match((await response.json()).message, /Database unavailable/);
});

test("normalizes valid product input", () => {
  const result = validateProductInput({
    name: "  Cocina  ",
    description: "  Descripción válida  ",
    category: "Cocinas",
    price: "1200",
  });

  assert.deepEqual(result, {
    data: {
      name: "Cocina",
      description: "Descripción válida",
      category: "Cocinas",
      imageUrl: "",
      price: 1200,
    },
  });
});

test("rejects invalid contact input", () => {
  assert.deepEqual(
    validateContactInput({
      name: "A",
      email: "not-an-email",
      message: "short",
    }),
    { error: "Escribe un nombre válido." },
  );
});

test("rejects null validation bodies without throwing", () => {
  assert.deepEqual(validateProductInput(null), {
    error: "Nombre, descripción y categoría son obligatorios.",
  });
  assert.deepEqual(validateContactInput(null), {
    error: "Nombre, correo y mensaje son obligatorios.",
  });
});
