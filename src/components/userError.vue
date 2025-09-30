<template>
  <div v-if="errors.length" class="alert">
    <ul>
      <li v-for="(err, i) in errors" :key="i">{{ err }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      required: true
    }
  }
};
</script>
