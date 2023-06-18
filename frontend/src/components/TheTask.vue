<template>
  <v-list-item>
    <div class="d-flex justify-space-between w-100 align-center font-5">
      <span>{{ title }}</span>

      <v-btn icon="mdi-close" flat @click="emit('removeTask')"></v-btn>
    </div>
  </v-list-item>

</template>

<script lang="ts" setup>
import { toRefs } from 'vue';

const props = defineProps<{
  title: string;
}>();

const { title } = toRefs(props);

const emit = defineEmits(['removeTask']);
</script>