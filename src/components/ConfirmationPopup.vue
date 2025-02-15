<template>
  <div class="popup-overlay" @click.stop="$emit('cancel')">
    <div class="popup-content" @click.stop>
      <h3>{{ title }}</h3>
      <p>{{ message }}</p>
      <div class="popup-actions">
        <button @click.stop="$emit('confirm')" class="delete">{{ confirmText }}</button>
        <button @click.stop="$emit('cancel')" class="cancel">{{ cancelText }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ConfirmationPopup',
  props: {
    title: {
      type: String,
      default: 'Confirm'
    },
    message: {
      type: String,
      required: true
    },
    confirmText: {
      type: String,
      default: 'Confirm'
    },
    cancelText: {
      type: String,
      default: 'Cancel'
    }
  }
}
</script>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 300px;
  text-align: center;
}

.popup-actions {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button.delete {
  background-color: #f44336;
  color: white;
}

button.cancel {
  background-color: #9e9e9e;
  color: white;
}

button:hover {
  opacity: 0.9;
}
</style> 