<template>
  <div class="pagination">
    <button
      v-for="page in totalPages"
      :key="page"
      @click="$emit('page-changed', page)"
      :class="{ active: currentPage === page }"
    >
      {{ page }}
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  props: {
    total: { type: Number, required: true },
    currentPage: { type: Number, required: true }
  },
  setup(props) {
    const totalPages = computed(() => Math.ceil(props.total / 5))

    return { totalPages }
  }
})
</script>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    padding: 5px 10px;
    margin: 0 5px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    border-radius: 4px;

    &.active {
      background-color: #0056b3;
      font-weight: bold;
    }

    &:hover {
      background-color: #0056b3;
    }
  }
}
</style>
