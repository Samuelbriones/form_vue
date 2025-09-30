<template>
  <div class="container">
    <h1>Formulario de Registro (Vue)</h1>

    <Errores :errors="errors" />
    <FormRegistro
      :form="form"
      :editIndex="editIndex"
      @submit-form="handleSubmit"
    />

    <ListaUsuarios
      :usuarios="usuarios"
      @edit-user="handleEdit"
      @delete-user="handleDelete"
    />
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import FormRegistro from "./components/formRegistro.vue";
import ListaUsuarios from "./components/listaUsuarios.vue";
import Errores from "./components/userError.vue";
import { userService } from "./services/userService.js";

export default {
  components: { FormRegistro, ListaUsuarios, Errores },
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
    const editId = ref(null);
    const errors = ref([]);

    const validateForm = () => {
      const newErrors = [];
      if (!form.dni) {
        newErrors.push("El DNI es obligatorio");
      } else if (!/^[0-9]{8,10}$/.test(form.dni)) {
        newErrors.push("El DNI debe ser numérico y tener entre 8 y 10 dígitos");
      } else if (usuarios.value.some(u => u.dni === form.dni && u.id !== editId.value)) {
        newErrors.push("El DNI ya está registrado");
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

    const fetchUsuarios = async () => {
      try {
        usuarios.value = await userService.getAll();
      } catch (e) {
        errors.value = [e.message];
      }
    };
    onMounted(fetchUsuarios);

    const handleSubmit = async () => {
      if (!validateForm()) return;

      try {
        if (editId.value !== null) {
          await userService.update(editId.value, form);
          editId.value = null;
          editIndex.value = null;
        } else {
          await userService.create(form);
        }
        await fetchUsuarios();
        Object.keys(form).forEach((key) => (form[key] = ""));
        errors.value = [];
      } catch (e) {
        errors.value = [e.message];
      }
    };

    const handleEdit = (index) => {
      const usuario = usuarios.value[index];
      Object.keys(form).forEach((key) => (form[key] = usuario[key]));
      editIndex.value = index;
      editId.value = usuario.id;
    };

    const handleDelete = async (index) => {
      const usuario = usuarios.value[index];
      try {
        await userService.remove(usuario.id);
        await fetchUsuarios();
      } catch (e) {
        errors.value = [e.message];
      }
    };

    return {
      usuarios,
      form,
      editIndex,
      errors,
      handleSubmit,
      handleEdit,
      handleDelete
    };
  }
};
</script>
