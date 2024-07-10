<template>
  <div>
    <h1>Task Manager</h1>
    <TaskList />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import TaskList from '../components/TaskList.vue'

export default defineComponent({
  name: 'TaskManager',
  components: {
    TaskList
  }
})
</script>

<style scoped>
/* Aggiungi i tuoi stili qui */
</style>
