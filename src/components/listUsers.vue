<template>
  <div>
    <h2>Usuarios Registrados</h2>
    <ul class="lista">
      <li v-for="(u, i) in usuarios" :key="u.id" class="usuario-item">
        <strong>{{ u.dni }}</strong> - {{ u.nombres }} {{ u.apellidos }} 
        ({{ u.genero }}, {{ u.ciudad }})
        <div>
          <button class="btn-edit" @click="$emit('edit-user', i)">Editar</button>
          <button class="btn-delete" @click="$emit('delete-user', i)">Eliminar</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    usuarios: {
      type: Array,
      required: true
    }
  },
  emits: ["edit-user", "delete-user"]
};
</script>
