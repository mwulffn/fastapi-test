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
  <div class="decision-node custom-node">
    <Handle type="target" :position="Position.Top" />
    <div class="decision-content">
      <span class="node-icon">◆</span>
      <strong>{{ data.label }}</strong>
    </div>
    <Handle type="source" :position="Position.Right" id="yes" />
    <Handle type="source" :position="Position.Left" id="no" />
    <Handle type="source" :position="Position.Bottom" id="default" />
  </div>
</template>

<style scoped>
.custom-node {
  padding: 16px;
  border-radius: 8px;
  border: 2px solid;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 140px;
  transition: all 0.2s;
}

.custom-node:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

.decision-node {
  border-color: #f59e0b;
  transform: rotate(45deg);
}

.decision-content {
  transform: rotate(-45deg);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
}

.node-icon {
  font-size: 1.25rem;
}
</style>
