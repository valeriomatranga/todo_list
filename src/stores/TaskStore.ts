import { defineStore } from 'pinia'
import axios from 'axios'
import type { Task } from '../types/Task'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
    totalTasks: 0
  }),
  actions: {
    async fetchTasks(page: number) {
      try {
        const response = await axios.get(`http://localhost:3000/tasks`)

        const perPage = 5 // Numero di tasks per pagina
        const start = (page - 1) * perPage
        const end = page * perPage

        this.tasks = response.data.slice(start, end)
        this.totalTasks = response.data.length
      } catch (error) {
        console.error('Error function fetchTasks:', error)
      }
    },
    async addTask(task: Task) {
      try {
        await axios.post(`http://localhost:3000/tasks`, task)
        this.fetchTasks(1)
      } catch (error) {
        console.error('Error function addTask:', error)
      }
    },
    async updateTask(task: Task) {
      try {
        await axios.put(`http://localhost:3000/tasks/${task.id}`, task)
        this.fetchTasks(1)
      } catch (error) {
        console.error('Error function updateTask:', error)
      }
    },
    async deleteTask(id: number) {
      try {
        await axios.delete(`http://localhost:3000/tasks/${id}`)
        this.fetchTasks(1)
      } catch (error) {
        console.error('Error function deleteTask:', error)
      }
    }
  }
})
