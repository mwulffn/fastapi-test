<script setup>
import { ref, onMounted, h, getCurrentInstance, render } from 'vue'
import Drawflow from 'drawflow'
import 'drawflow/dist/drawflow.min.css'

const drawflowContainer = ref(null)
let editor = null
const instance = getCurrentInstance()

onMounted(() => {
  // Initialize Drawflow
  const id = drawflowContainer.value
  editor = new Drawflow(id, instance.appContext.app._context)
  editor.reroute = true
  editor.start()

  // Add some initial nodes
  addStartNode()
  addActionNode(200, 150, 'Process Request')
  addDecisionNode(200, 280, 'Valid?')
  addActionNode(400, 380, 'Execute Workflow')
  addActionNode(50, 380, 'Return Error')
  addEndNode()
})

const addStartNode = () => {
  const data = { label: 'Start' }
  editor.addNode(
    'start',
    0,
    1,
    100,
    50,
    'start-node',
    data,
    `<div class="node-content">
      <div class="node-icon">▶️</div>
      <div class="node-label">Start</div>
    </div>`
  )
}

const addActionNode = (x, y, label) => {
  const data = { label }
  editor.addNode(
    'action',
    1,
    1,
    x,
    y,
    'action-node',
    data,
    `<div class="node-content">
      <div class="node-icon">📋</div>
      <div class="node-label">${label}</div>
    </div>`
  )
}

const addDecisionNode = (x, y, label) => {
  const data = { label }
  editor.addNode(
    'decision',
    1,
    2,
    x,
    y,
    'decision-node',
    data,
    `<div class="node-content">
      <div class="node-icon">◆</div>
      <div class="node-label">${label}</div>
    </div>`
  )
}

const addEndNode = () => {
  const data = { label: 'End' }
  editor.addNode(
    'end',
    1,
    0,
    250,
    500,
    'end-node',
    data,
    `<div class="node-content">
      <div class="node-icon">⏹️</div>
      <div class="node-label">End</div>
    </div>`
  )
}

const onAddStart = () => {
  addStartNode()
}

const onAddAction = () => {
  const count = Object.keys(editor.drawflow.drawflow.Home.data).length
  addActionNode(Math.random() * 400 + 100, Math.random() * 300 + 100, `Action ${count}`)
}

const onAddDecision = () => {
  const count = Object.keys(editor.drawflow.drawflow.Home.data).length
  addDecisionNode(Math.random() * 400 + 100, Math.random() * 300 + 100, `Decision ${count}`)
}

const onAddEnd = () => {
  addEndNode()
}

const clearCanvas = () => {
  if (confirm('Clear all nodes?')) {
    editor.clear()
  }
}

const exportData = () => {
  const data = editor.export()
  console.log('Exported data:', data)
  alert('Data exported to console. Check browser console (F12)')
}
</script>

<template>
  <div class="app">
    <aside class="sidebar">
      <h3>Drawflow Demo</h3>
      <p class="description">Lightweight Vue.js flow library</p>
      <div class="badge badge-success">Bundle: 9.28 kB</div>

      <div class="node-palette">
        <button class="palette-btn start-btn" @click="onAddStart">
          <span class="icon">▶️</span>
          <span>Add Start</span>
        </button>

        <button class="palette-btn action-btn" @click="onAddAction">
          <span class="icon">📋</span>
          <span>Add Action</span>
        </button>

        <button class="palette-btn decision-btn" @click="onAddDecision">
          <span class="icon">◆</span>
          <span>Add Decision</span>
        </button>

        <button class="palette-btn end-btn" @click="onAddEnd">
          <span class="icon">⏹️</span>
          <span>Add End</span>
        </button>
      </div>

      <div class="controls">
        <button class="btn btn-secondary" @click="exportData">Export Data</button>
        <button class="btn btn-danger" @click="clearCanvas">Clear All</button>
      </div>

      <div class="info-section">
        <h4>Features:</h4>
        <ul>
          <li>Click buttons to add nodes</li>
          <li>Drag nodes to move</li>
          <li>Click output dot to connect</li>
          <li>Ctrl + Mouse Wheel to zoom</li>
          <li>Lightweight (no deps)</li>
        </ul>
      </div>

      <div class="info-section advantage">
        <h4>✨ Advantages:</h4>
        <ul>
          <li>Tiny bundle size (9.28 kB)</li>
          <li>No dependencies</li>
          <li>Vue 2 & 3 support</li>
          <li>Simple API</li>
          <li>Fast performance</li>
        </ul>
      </div>
    </aside>

    <div class="canvas-wrapper">
      <div class="canvas-header">
        <h2>📦 Drawflow BPM Demo - Lightweight Alternative</h2>
      </div>
      <div ref="drawflowContainer" id="drawflow" class="drawflow-container"></div>
    </div>
  </div>
</template>

<style>
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
  width: 300px;
  background: #1e293b;
  color: #e2e8f0;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.2);
  z-index: 10;
}

.sidebar h3 {
  font-size: 1.5rem;
  color: #f1f5f9;
  margin: 0;
}

.sidebar h4 {
  font-size: 1rem;
  color: #f1f5f9;
  margin: 0 0 12px 0;
}

.sidebar .description {
  color: #94a3b8;
  font-size: 0.875rem;
  margin-top: -8px;
}

.badge {
  display: inline-block;
  padding: 6px 12px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-success {
  background: #10b981;
  color: white;
}

.node-palette {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.palette-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  background: #334155;
  border: 2px solid #475569;
  border-radius: 8px;
  color: #e2e8f0;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.palette-btn:hover {
  background: #3f4c5e;
  border-color: #64748b;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.palette-btn .icon {
  font-size: 1.5rem;
}

.start-btn { border-color: #10b981; }
.action-btn { border-color: #3b82f6; }
.decision-btn { border-color: #f59e0b; }
.end-btn { border-color: #ef4444; }

.controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 16px;
  border-top: 1px solid #475569;
}

.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.btn-secondary {
  background: #10b981;
  color: white;
}

.btn-secondary:hover {
  background: #059669;
}

.btn-danger {
  background: #ef4444;
  color: white;
}

.btn-danger:hover {
  background: #dc2626;
}

.info-section {
  padding-top: 16px;
  border-top: 1px solid #475569;
}

.info-section.advantage {
  background: rgba(16, 185, 129, 0.1);
  border: 1px solid #10b981;
  border-radius: 8px;
  padding: 16px;
  margin-top: 8px;
}

.info-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.info-section li {
  color: #94a3b8;
  font-size: 0.875rem;
  padding: 4px 0;
  padding-left: 20px;
  position: relative;
}

.info-section li::before {
  content: '•';
  position: absolute;
  left: 8px;
  color: #3b82f6;
}

.info-section.advantage li::before {
  content: '✓';
  color: #10b981;
}

/* Canvas Wrapper */
.canvas-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #0f172a;
}

.canvas-header {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  color: white;
  padding: 16px 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.canvas-header h2 {
  font-size: 1.25rem;
  margin: 0;
}

.drawflow-container {
  flex: 1;
  background: #f8fafc;
}

/* Drawflow Custom Styles */
.drawflow .drawflow-node {
  border-radius: 8px;
  border: 2px solid;
  padding: 12px;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.drawflow .start-node {
  border-color: #10b981;
  background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
}

.drawflow .action-node {
  border-color: #3b82f6;
}

.drawflow .decision-node {
  border-color: #f59e0b;
}

.drawflow .end-node {
  border-color: #ef4444;
  background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
}

.node-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-align: center;
}

.node-icon {
  font-size: 1.5rem;
}

.node-label {
  font-weight: 600;
  font-size: 0.875rem;
  color: #1e293b;
}

/* Scrollbar */
.sidebar::-webkit-scrollbar {
  width: 8px;
}

.sidebar::-webkit-scrollbar-track {
  background: #0f172a;
}

.sidebar::-webkit-scrollbar-thumb {
  background: #475569;
  border-radius: 4px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: #64748b;
}
</style>
