<template>
  <v-container>
    <v-card>
      <v-card-title>
        Todo List
      </v-card-title>

      <v-card-text>
        Create task

        <v-text-field label="Type your task here..." v-model="newTask"></v-text-field>
        <v-btn color="green" @click="addTask(newTask)">Create</v-btn>
      </v-card-text>

      <v-card-subtitle>
        You have {{ tasks.length }} {{ tasks.length === 1 ? 'task' : 'tasks' }}
      </v-card-subtitle>

      <v-list>
        <TheTask v-for="task in tasks" :key="task.id" :title="task.title" @removeTask="removeTask(task.id)" />
      </v-list>
    </v-card>
  </v-container>
</template>

<script lang="ts" setup>
import { Task } from '@/types';
import { ref } from 'vue';
import TheTask from './TheTask.vue';
import { onMounted } from 'vue';
import axios from 'axios';

const newTask = ref<string>('');

const tasks = ref<Task[]>([]);

onMounted(async () => {
  const _tasks = await axios.get<Task[]>('http://localhost:5000/tasks');

  tasks.value = _tasks.data;
});

async function addTask(task: string) {
  const _task = await axios.post<Task>('http://localhost:5000/tasks', {
    title: task
  })

  tasks.value?.push(_task.data);
  newTask.value = "";
}

async function removeTask(id: number) {
  const _task = await axios.delete<Task>(`http://localhost:5000/tasks/${id}`);

  tasks.value = tasks.value.filter((task) => task.id !== _task.data.id);
}
</script>
