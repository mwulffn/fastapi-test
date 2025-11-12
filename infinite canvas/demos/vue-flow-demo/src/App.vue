<script setup>
import { ref } from 'vue'
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { Background } from '@vue-flow/background'
import { Controls } from '@vue-flow/controls'
import { MiniMap } from '@vue-flow/minimap'
import ActionNode from './nodes/ActionNode.vue'
import DecisionNode from './nodes/DecisionNode.vue'
import StartEndNode from './nodes/StartEndNode.vue'

// Register custom node types
const nodeTypes = {
  action: ActionNode,
  decision: DecisionNode,
  startEnd: StartEndNode,
}

// Initial nodes
const nodes = ref([
  {
    id: '1',
    type: 'startEnd',
    position: { x: 250, y: 50 },
    data: { label: 'Start', nodeType: 'start' },
  },
  {
    id: '2',
    type: 'action',
    position: { x: 200, y: 150 },
    data: { label: 'Process Request', description: 'Validate and process incoming request' },
  },
  {
    id: '3',
    type: 'decision',
    position: { x: 200, y: 280 },
    data: { label: 'Valid Request?' },
  },
  {
    id: '4',
    type: 'action',
    position: { x: 400, y: 380 },
    data: { label: 'Execute Workflow', description: 'Run the main business logic' },
  },
  {
    id: '5',
    type: 'action',
    position: { x: 50, y: 380 },
    data: { label: 'Return Error', description: 'Send error response' },
  },
  {
    id: '6',
    type: 'startEnd',
    position: { x: 250, y: 500 },
    data: { label: 'End', nodeType: 'end' },
  },
])

// Initial edges
const edges = ref([
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4', label: 'Yes', type: 'smoothstep' },
  { id: 'e3-5', source: '3', target: '5', label: 'No', type: 'smoothstep' },
  { id: 'e4-6', source: '4', target: '6' },
  { id: 'e5-6', source: '5', target: '6' },
])

let nodeId = 7

const { onConnect, addEdges, addNodes, screenToFlowCoordinate } = useVueFlow()

// Handle connection between nodes
onConnect((params) => {
  addEdges([params])
})

// Drag over handler
const onDragOver = (event) => {
  event.preventDefault()
  event.dataTransfer.dropEffect = 'move'
}

// Drop handler
const onDrop = (event) => {
  const type = event.dataTransfer.getData('application/vueflow')

  if (!type) {
    return
  }

  const position = screenToFlowCoordinate({
    x: event.clientX,
    y: event.clientY,
  })

  const newNode = {
    id: `${nodeId++}`,
    type,
    position,
    data: {
      label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${nodeId}`,
      description: type === 'action' ? 'New action node' : undefined,
      nodeType: type === 'startEnd' ? 'start' : undefined,
    },
  }

  addNodes([newNode])
}

// Drag start handler
const onDragStart = (event, nodeType) => {
  event.dataTransfer.setData('application/vueflow', nodeType)
  event.dataTransfer.effectAllowed = 'move'
}
</script>

<template>
  <div class="app">
    <aside class="sidebar">
      <h3>BPM Actions</h3>
      <p class="description">Drag and drop nodes to the canvas</p>

      <div class="node-palette">
        <div
          class="palette-node start-end"
          draggable="true"
          @dragstart="onDragStart($event, 'startEnd')"
        >
          <div class="node-icon">⚫</div>
          <span>Start/End</span>
        </div>

        <div
          class="palette-node action"
          draggable="true"
          @dragstart="onDragStart($event, 'action')"
        >
          <div class="node-icon">📋</div>
          <span>Action</span>
        </div>

        <div
          class="palette-node decision"
          draggable="true"
          @dragstart="onDragStart($event, 'decision')"
        >
          <div class="node-icon">◆</div>
          <span>Decision</span>
        </div>
      </div>

      <div class="info-section">
        <h4>Features:</h4>
        <ul>
          <li>Drag nodes from palette</li>
          <li>Connect nodes by dragging handles</li>
          <li>Pan: Click and drag canvas</li>
          <li>Zoom: Scroll wheel</li>
          <li>Delete: Select node and press Delete</li>
        </ul>
      </div>
    </aside>

    <div class="canvas-container">
      <VueFlow
        :nodes="nodes"
        :edges="edges"
        :node-types="nodeTypes"
        @dragover="onDragOver"
        @drop="onDrop"
        fit-view-on-init
      >
        <Background pattern-color="#aaa" :gap="16" />
        <Controls />
        <MiniMap />
        <template #panel-header>
          <div class="panel-header">
            <h2>🔄 BPM Process Modeler - Vue Flow Demo</h2>
          </div>
        </template>
      </VueFlow>
    </div>
  </div>
</template>

<style>
@import '@vue-flow/core/dist/style.css';
@import '@vue-flow/core/dist/theme-default.css';
@import '@vue-flow/controls/dist/style.css';
@import '@vue-flow/minimap/dist/style.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.app {
  display: flex;
  height: 100vh;
  width: 100vw;
}

/* Sidebar Styles */
.sidebar {
  width: 280px;
  background: #1e293b;
  color: #e2e8f0;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.sidebar h3 {
  font-size: 1.5rem;
  color: #f1f5f9;
  margin: 0;
}

.sidebar .description {
  color: #94a3b8;
  font-size: 0.875rem;
  margin-top: -12px;
}

.node-palette {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.palette-node {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #334155;
  border: 2px solid #475569;
  border-radius: 8px;
  cursor: grab;
  transition: all 0.2s;
  font-weight: 500;
}

.palette-node:hover {
  background: #3f4c5e;
  border-color: #64748b;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.palette-node:active {
  cursor: grabbing;
}

.palette-node.start-end {
  border-color: #10b981;
}

.palette-node.action {
  border-color: #3b82f6;
}

.palette-node.decision {
  border-color: #f59e0b;
}

.node-icon {
  font-size: 1.5rem;
}

.info-section {
  margin-top: auto;
  padding-top: 24px;
  border-top: 1px solid #475569;
}

.info-section h4 {
  color: #f1f5f9;
  margin-bottom: 12px;
  font-size: 1rem;
}

.info-section ul {
  list-style: none;
  padding: 0;
}

.info-section li {
  color: #94a3b8;
  font-size: 0.875rem;
  padding: 6px 0;
  padding-left: 20px;
  position: relative;
}

.info-section li::before {
  content: '•';
  position: absolute;
  left: 8px;
  color: #3b82f6;
}

/* Canvas Container */
.canvas-container {
  flex: 1;
  background: #0f172a;
}

/* Panel Header */
.panel-header {
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(8px);
  padding: 16px 24px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.panel-header h2 {
  color: #f1f5f9;
  font-size: 1.25rem;
  margin: 0;
}

/* Vue Flow Customization */
.vue-flow__node {
  cursor: move;
}

.vue-flow__handle {
  width: 10px;
  height: 10px;
  background: #3b82f6;
  border: 2px solid white;
}

.vue-flow__handle:hover {
  background: #2563eb;
  transform: scale(1.3);
}

.vue-flow__edge-path {
  stroke: #64748b;
  stroke-width: 2;
}

.vue-flow__edge.selected .vue-flow__edge-path {
  stroke: #3b82f6;
  stroke-width: 3;
}

.vue-flow__minimap {
  background: #1e293b;
  border-radius: 8px;
}
</style>
