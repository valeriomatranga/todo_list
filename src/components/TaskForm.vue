<template>
  <form @submit.prevent="handleSubmit">
    <input
      v-model="localTask.name"
      placeholder="Nuovo Task"
      required
      id="task-name"
      name="task-name"
    />
    <button type="submit">{{ localTask.id ? 'Aggiorna' : 'Crea nuovo' }}</button>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import type { Task } from '../types/Task'
import { useTaskStore } from '../stores/TaskStore'

export default defineComponent({
  props: {
    task: {
      type: Object as () => Task,
      default: () => ({ name: '', completed: false })
    }
  },
  emits: ['taskUpdated'],
  setup(props, { emit }) {
    const taskStore = useTaskStore()
    const localTask = ref({ ...props.task })

    watch(
      () => props.task,
      (newTask) => {
        localTask.value = { ...newTask }
      }
    )

    const handleSubmit = () => {
      if (localTask.value.id) {
        taskStore.updateTask(localTask.value)
      } else {
        taskStore.addTask(localTask.value)
      }
      emit('taskUpdated')
    }

    return { localTask, handleSubmit }
  }
})
</script>

<style lang="scss" scoped>
form {
  display: flex;
  flex-direction: column;

  input {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  button {
    padding: 5px 10px;
    border: none;
    background-color: #28a745;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: #218838;
    }
  }
}
</style>
