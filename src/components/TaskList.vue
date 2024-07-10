<template>
  <div class="list">
    <TaskForm @task-added="fetchTasks" />
    <input v-model="searchQuery" placeholder="Ricerca.." id="searchTask" name="searchTask" />
    <TaskItem
      v-for="task in filteredTasks"
      :key="task.id"
      :task="task"
      @task-updated="fetchTasks"
      @task-deleted="fetchTasks"
    />
    <Pagination :total="totalTasks" :current-page="currentPage" @page-changed="handlePageChange" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useTaskStore } from '../stores/TaskStore'
import TaskItem from './TaskItem.vue'
import TaskForm from './TaskForm.vue'
import Pagination from './TaskPagination.vue'

export default defineComponent({
  components: { TaskItem, TaskForm, Pagination },
  setup() {
    const taskStore = useTaskStore()
    const searchQuery = ref('')
    const currentPage = ref(1)

    const fetchTasks = () => {
      taskStore.fetchTasks(currentPage.value)
    }

    const filteredTasks = computed(() => {
      return taskStore.tasks.filter((task) =>
        task.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      )
    })

    const totalTasks = computed(() => taskStore.totalTasks)

    const handlePageChange = (page: number) => {
      currentPage.value = page
      fetchTasks()
    }

    fetchTasks()

    return { searchQuery, filteredTasks, totalTasks, currentPage, handlePageChange, fetchTasks }
  }
})
</script>

<style lang="scss" scoped>
.list {
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 10px 0;
  }
}
</style>
