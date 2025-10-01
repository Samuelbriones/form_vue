<template>
  <div class="container">
    <h1>Formulario de Registro (Vue)</h1>

    <Errores :errors="errors" />

    <!-- Formulario de registro -->
    <FormRegistro
      :form="form"
      :editIndex="editIndex"
      @submit-form="handleSubmit"
    />

    <!-- Lista de usuarios -->
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
import ListaUsuarios from "./components/listUsers.vue";
import Errores from "./components/userError.vue";
import { userService } from "./services/userService.js";
import { validateForm } from "./services/validation.js";

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

    // Cargar usuarios desde el backend
    const fetchUsuarios = async () => {
      try {
        usuarios.value = await userService.getAll();
      } catch (e) {
        errors.value = [e.message];
      }
    };
    onMounted(fetchUsuarios);

    // Manejar envío del formulario
    const handleSubmit = async () => {
      const newErrors = validateForm(form, usuarios.value, editId.value);
      if (newErrors.length > 0) {
        errors.value = newErrors;
        return;
      }

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
