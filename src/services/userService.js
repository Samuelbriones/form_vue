const API_URL = "http://localhost:3001/usuarios";

export const userService = {
  async getAll() {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al obtener usuarios");
    return res.json();
  },

  async create(usuario) {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });
    if (!res.ok) throw new Error("Error al crear usuario");
    return res.json();
  },

  async update(id, usuario) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario),
    });
    if (!res.ok) throw new Error("Error al actualizar usuario");
    return res.json();
  },

  async remove(id) {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar usuario");
    return res.json();
  },
};
