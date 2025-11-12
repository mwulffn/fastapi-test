import { useCallback, useRef } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Panel,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

import ActionNode from './nodes/ActionNode';
import DecisionNode from './nodes/DecisionNode';
import StartEndNode from './nodes/StartEndNode';
import './App.css';

const nodeTypes = {
  action: ActionNode,
  decision: DecisionNode,
  startEnd: StartEndNode,
};

const initialNodes = [
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
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4', label: 'Yes', type: 'smoothstep' },
  { id: 'e3-5', source: '3', target: '5', label: 'No', type: 'smoothstep' },
  { id: 'e4-6', source: '4', target: '6' },
  { id: 'e5-6', source: '5', target: '6' },
];

let nodeId = 7;

function App() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');

      if (!type) {
        return;
      }

      const position = {
        x: event.clientX - 150,
        y: event.clientY - 50,
      };

      const newNode = {
        id: `${nodeId++}`,
        type,
        position,
        data: {
          label: `${type.charAt(0).toUpperCase() + type.slice(1)} ${nodeId}`,
          description: type === 'action' ? 'New action node' : undefined,
          nodeType: type === 'startEnd' ? 'start' : undefined,
        },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes]
  );

  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <h3>BPM Actions</h3>
        <p className="description">Drag and drop nodes to the canvas</p>

        <div className="node-palette">
          <div
            className="palette-node start-end"
            onDragStart={(event) => onDragStart(event, 'startEnd')}
            draggable
          >
            <div className="node-icon">⚫</div>
            <span>Start/End</span>
          </div>

          <div
            className="palette-node action"
            onDragStart={(event) => onDragStart(event, 'action')}
            draggable
          >
            <div className="node-icon">📋</div>
            <span>Action</span>
          </div>

          <div
            className="palette-node decision"
            onDragStart={(event) => onDragStart(event, 'decision')}
            draggable
          >
            <div className="node-icon">◆</div>
            <span>Decision</span>
          </div>
        </div>

        <div className="info-section">
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

      <div className="canvas-container" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="bottom-left"
        >
          <Background variant="dots" gap={12} size={1} />
          <Controls />
          <MiniMap
            nodeColor={(node) => {
              switch (node.type) {
                case 'startEnd':
                  return '#10b981';
                case 'action':
                  return '#3b82f6';
                case 'decision':
                  return '#f59e0b';
                default:
                  return '#6b7280';
              }
            }}
          />
          <Panel position="top-left" className="panel-header">
            <h2>🔄 BPM Process Modeler - React Flow Demo</h2>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}

export default App;
