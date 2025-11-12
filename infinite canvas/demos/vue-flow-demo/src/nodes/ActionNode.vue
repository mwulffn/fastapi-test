<script setup>
import { Handle, Position } from '@vue-flow/core'

defineProps({
  data: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div class="action-node custom-node">
    <Handle type="target" :position="Position.Top" />
    <div class="node-header">
      <span class="node-icon">📋</span>
      <strong>{{ data.label }}</strong>
    </div>
    <div v-if="data.description" class="node-description">
      {{ data.description }}
    </div>
    <Handle type="source" :position="Position.Bottom" />
  </div>
</template>

<style scoped>
.custom-node {
  padding: 16px;
  border-radius: 8px;
  border: 2px solid;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 160px;
  transition: all 0.2s;
}

.custom-node:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

.action-node {
  border-color: #3b82f6;
}

.node-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
}

.node-icon {
  font-size: 1.25rem;
}

.node-description {
  font-size: 0.875rem;
  color: #64748b;
  margin-top: 4px;
}
</style>
