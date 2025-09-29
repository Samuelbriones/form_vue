<template>
  <div style="margin: 20px;">
    <h1>Formulario de Registro (Vue)</h1>

    <form @submit.prevent="handleSubmit">
      <input type="text" v-model="form.dni" placeholder="DNI" />
      <br />
      <input type="text" v-model="form.nombres" placeholder="Nombres" />
      <br />
      <input type="text" v-model="form.apellidos" placeholder="Apellidos" />
      <br />
      <input type="date" v-model="form.fechaNacimiento" />
      <br />
      <div>
        Género:
        <label>
          <input type="radio" value="Masculino" v-model="form.genero" /> Masculino
        </label>
        <label>
          <input type="radio" value="Femenino" v-model="form.genero" /> Femenino
        </label>
      </div>
      <br />
      <select v-model="form.ciudad">
        <option value="">Seleccione ciudad</option>
        <option>Guayaquil</option>
        <option>Quito</option>
        <option>Cuenca</option>
      </select>
      <br />
      <button type="submit">{{ editIndex !== null ? "Actualizar" : "Agregar" }}</button>
    </form>

    <h2>Usuarios Registrados</h2>
    <ul>
      <li v-for="(u, i) in usuarios" :key="i">
        {{ u.dni }} - {{ u.nombres }} {{ u.apellidos }} ({{ u.genero }}, {{ u.ciudad }})
        <button @click="handleEdit(i)">Editar</button>
        <button @click="handleDelete(i)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script>
import { reactive, ref } from "vue";

export default {
  setup() {
    const usuarios = ref([]);
    const form = reactive({
      dni: "",
      nombres: "",
      apellidos: "",
      fechaNacimiento: "",
      genero: "",
      ciudad: ""
    });
    const editIndex = ref(null);

    const handleSubmit = () => {
      if (!form.dni || !form.nombres || !form.apellidos || !form.genero || !form.ciudad) {
        alert("Todos los campos son obligatorios");
        return;
      }

      if (editIndex.value !== null) {
        usuarios.value[editIndex.value] = { ...form };
        editIndex.value = null;
      } else {
        usuarios.value.push({ ...form });
      }

      // Resetear formulario
      Object.keys(form).forEach(key => form[key] = "");
    };

    const handleEdit = (index) => {
      Object.keys(form).forEach(key => form[key] = usuarios.value[index][key]);
      editIndex.value = index;
    };

    const handleDelete = (index) => {
      usuarios.value.splice(index, 1);
    };

    return { usuarios, form, editIndex, handleSubmit, handleEdit, handleDelete };
  }
};
</script>

<style>
input, select, button {
  margin: 5px;
  padding: 8px;
}
</style>
