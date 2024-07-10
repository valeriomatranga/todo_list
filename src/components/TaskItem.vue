<template>
  <div class="item">
    <div>
      <button @click="editTask">Modifica</button>
      <button @click="showDeleteModal">Elimina</button>
    </div>

    <div>
      <input
        type="checkbox"
        v-model="localTask.completed"
        @change="toggleCompletion"
        :id="'task-' + localTask.id"
        :name="'task-' + localTask.id"
      />
      <span>{{ localTask.name }}</span>
    </div>

    <TaskForm v-if="isEditing" :task="localTask" @task-updated="stopEditing" />

    <ConfirmModal
      :isVisible="isDeleteModalVisible"
      @confirm="deleteTask"
      @cancel="hideDeleteModal"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import type { Task } from '../types/Task'
import { useTaskStore } from '../stores/TaskStore'
import TaskForm from './TaskForm.vue'
import ConfirmModal from './ConfirmModal.vue'

export default defineComponent({
  components: { TaskForm, ConfirmModal },
  props: {
    task: {
      type: Object as () => Task,
      required: true
    }
  },
  emits: ['taskUpdated', 'taskDeleted'],
  setup(props, { emit }) {
    const taskStore = useTaskStore()
    const isEditing = ref(false)
    const localTask = ref({ ...props.task })
    const isDeleteModalVisible = ref(false)

    watch(
      () => props.task,
      (newTask) => {
        localTask.value = { ...newTask }
      }
    )

    const toggleCompletion = async () => {
      localTask.value.completed
      await taskStore.updateTask(localTask.value)
      emit('taskUpdated')
    }

    const editTask = () => {
      isEditing.value = true
    }

    const showDeleteModal = () => {
      isDeleteModalVisible.value = true
    }

    const hideDeleteModal = () => {
      isDeleteModalVisible.value = false
    }

    const deleteTask = async () => {
      await taskStore.deleteTask(localTask.value.id!)
      emit('taskDeleted')
      hideDeleteModal()
    }

    const stopEditing = () => {
      isEditing.value = false
    }

    return {
      isEditing,
      localTask,
      toggleCompletion,
      editTask,
      showDeleteModal,
      hideDeleteModal,
      deleteTask,
      isDeleteModalVisible,
      stopEditing
    }
  }
})
</script>

<style lang="scss" scoped>
.item {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-shadow: 1px 1px 4px 0px #c7c7c8;
  margin-bottom: 10px;

  div:first-child {
    width: fit-content;
    margin-left: auto;
  }

  input[type='checkbox'] {
    margin-right: 10px;
  }

  label {
    font-weight: bold;
  }

  button {
    margin-left: 10px;
    padding: 5px 10px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: #0056b3;
    }
  }
}
</style>
