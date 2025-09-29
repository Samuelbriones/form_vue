<template>
  <div class="container">
    <h1>Formulario de Registro (Vue)</h1>

    <div v-if="errors.length" class="alert">
      <ul>
        <li v-for="(err, i) in errors" :key="i">{{ err }}</li>
      </ul>
    </div>

    <form @submit.prevent="handleSubmit" class="formulario">
      <input type="text" v-model="form.dni" placeholder="DNI" />
      <input type="text" v-model="form.nombres" placeholder="Nombres" />
      <input type="text" v-model="form.apellidos" placeholder="Apellidos" />
      <input type="date" v-model="form.fechaNacimiento" />

      <div class="radio-group">
        <span>Género:</span>
        <label>
          <input type="radio" value="Masculino" v-model="form.genero" />
          Masculino
        </label>
        <label>
          <input type="radio" value="Femenino" v-model="form.genero" />
          Femenino
        </label>
      </div>

      <select v-model="form.ciudad">
        <option value="">Seleccione ciudad</option>
        <option>Guayaquil</option>
        <option>Milagro</option>
        <option>Cuenca</option>
      </select>

      <button type="submit" class="btn">
        {{ editIndex !== null ? "Actualizar" : "Agregar" }}
      </button>
    </form>

    <h2>Usuarios Registrados</h2>
    <ul class="lista">
      <li v-for="(u, i) in usuarios" :key="i" class="usuario-item">
        <strong>{{ u.dni }}</strong> - {{ u.nombres }} {{ u.apellidos }} 
        ({{ u.genero }}, {{ u.ciudad }})
        <div>
          <button class="btn-edit" @click="handleEdit(i)">Editar</button>
          <button class="btn-delete" @click="handleDelete(i)">Eliminar</button>
        </div>
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
    const errors = ref([]);

    // Validaciones
    const validateForm = () => {
      const newErrors = [];

      if (!form.dni) {
        newErrors.push("El DNI es obligatorio");
      } else if (!/^[0-9]{8,10}$/.test(form.dni)) {
        newErrors.push("El DNI debe ser numérico y tener entre 8 y 10 dígitos");
      }

      if (!form.nombres || form.nombres.length < 2) {
        newErrors.push("El nombre debe tener al menos 2 caracteres");
      }

      if (!form.apellidos || form.apellidos.length < 2) {
        newErrors.push("El apellido debe tener al menos 2 caracteres");
      }

      if (!form.fechaNacimiento) {
        newErrors.push("Debe ingresar una fecha de nacimiento");
      } else if (new Date(form.fechaNacimiento) > new Date()) {
        newErrors.push("La fecha de nacimiento no puede ser futura");
      }

      if (!form.genero) {
        newErrors.push("Debe seleccionar un género");
      }

      if (!form.ciudad) {
        newErrors.push("Debe seleccionar una ciudad");
      }

      errors.value = newErrors;
      return newErrors.length === 0;
    };

    const handleSubmit = () => {
      if (!validateForm()) return;

      if (editIndex.value !== null) {
        usuarios.value[editIndex.value] = { ...form };
        editIndex.value = null;
      } else {
        usuarios.value.push({ ...form });
      }

      // Resetear formulario
      Object.keys(form).forEach((key) => (form[key] = ""));
      errors.value = [];
    };

    const handleEdit = (index) => {
      Object.keys(form).forEach((key) => (form[key] = usuarios.value[index][key]));
      editIndex.value = index;
    };

    const handleDelete = (index) => {
      usuarios.value.splice(index, 1);
    };

    return { usuarios, form, editIndex, errors, handleSubmit, handleEdit, handleDelete };
  }
};
</script>
