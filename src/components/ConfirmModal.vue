<template>
  <div class="modal" v-if="isVisible">
    <div class="modal-content">
      <h3>Conferma Eliminazione</h3>
      <p>Sei sicuro di volere eliminare questo Task?</p>
      <button class="confirm-button" @click="confirm">Si confermo</button>
      <button class="cancel-button" @click="cancel">No annulla</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  emits: ['confirm', 'cancel'],
  setup(props, { emit }) {
    const confirm = () => {
      emit('confirm')
    }

    const cancel = () => {
      emit('cancel')
    }

    return { confirm, cancel }
  }
})
</script>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;

  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 4px;
    text-align: center;

    button {
      margin: 10px;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
      transition: all;
      transition-duration: 300ms;

      &:hover {
        scale: 0.9;
      }

      &.confirm-button {
        background-color: #dc3545;
        color: white;
      }

      &.cancel-button {
        background-color: #6c757d;
        color: white;
      }
    }
  }
}
</style>
