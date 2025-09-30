<template>
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
</template>

<script>
export default {
  props: {
    form: Object,
    editIndex: Number
  },
  emits: ["submit-form"],
  setup(props, { emit }) {
    const handleSubmit = () => {
      emit("submit-form");
    };
    return { handleSubmit };
  }
};
</script>
