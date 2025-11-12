<script setup>
import { computed } from 'vue'
import { Handle, Position } from '@vue-flow/core'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
})

const isStart = computed(() => props.data.nodeType === 'start')
</script>

<template>
  <div :class="['start-end-node', 'custom-node', { start: isStart, end: !isStart }]">
    <Handle v-if="!isStart" type="target" :position="Position.Top" />
    <div class="start-end-content">
      <span class="node-icon">{{ isStart ? '▶️' : '⏹️' }}</span>
      <strong>{{ data.label }}</strong>
    </div>
    <Handle v-if="isStart" type="source" :position="Position.Bottom" />
  </div>
</template>

<style scoped>
.custom-node {
  padding: 16px;
  border-radius: 50%;
  border: 2px solid;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  min-width: 120px;
  min-height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.custom-node:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
}

.start-end-node.start {
  border-color: #10b981;
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
}

.start-end-node.end {
  border-color: #ef4444;
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
}

.start-end-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.node-icon {
  font-size: 1.5rem;
}
</style>
