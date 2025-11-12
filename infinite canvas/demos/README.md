# Infinite Canvas Demos for BPM Process Modeling

This folder contains **FIVE** different implementations of infinite canvas/node-based editors for BPM process modeling, demonstrating different approaches and technologies for both **Vue.js** and **React** frameworks.

---

## 🎯 Quick Recommendation

- **Using Vue.js?** → Use **Vue Flow Demo** (#1)
- **Using React?** → Use **React Flow Demo** (#3)
- **Need BPMN 2.0?** → Use **BPMN.js Demo** (#4)
- **Tiny bundle size?** → Consider **Drawflow Demo** (#2)

---

## Vue.js Demos (RECOMMENDED for Vue users)

### 1. Vue Flow Demo ⭐ RECOMMENDED FOR VUE.JS
**Location:** `vue-flow-demo/`
**Port:** 3002
**Framework:** Vue 3

A modern, feature-rich implementation using Vue Flow, the Vue 3 equivalent of React Flow, demonstrating a production-ready BPM process modeler.

**Features:**
- Native Vue 3 components
- Infinite canvas with pan & zoom
- Drag & drop node palette
- Custom node types (Start/End, Action, Decision)
- Visual connection of nodes
- Mini-map for navigation
- Background grid with dots pattern
- Professional UI/UX
- Node selection and deletion
- Smooth animations

**Tech Stack:**
- Vue 3
- @vue-flow/core 1.47.x
- @vue-flow/background
- @vue-flow/controls
- @vue-flow/minimap
- Vite

**Why Vue Flow?**
- Purpose-built for Vue 3 with Composition API
- Custom nodes are `.vue` components
- Active development (updated ~1 month ago)
- Feature parity with React Flow v11
- 70+ projects using it in production

---

### 2. Drawflow Demo (Lightweight Vue Alternative)
**Location:** `drawflow-demo/`
**Port:** 3003
**Framework:** Vue 3
**Bundle Size:** **9.28 kB** (Minified + Gzipped)

A lightweight implementation using Drawflow, demonstrating a minimal-dependency BPM modeler with tiny bundle size.

**Features:**
- Extremely lightweight (9.28 kB!)
- Zero dependencies
- Vue 2 & 3 support
- Click-to-add nodes
- Drag nodes to move
- Node connections
- Zoom with Ctrl + Mouse Wheel
- JSON export/import
- Mobile support

**Tech Stack:**
- Vue 3
- Drawflow 0.0.60
- Vite

**Why Drawflow?**
- Tiny bundle size (vs 100+ kB for Vue Flow)
- No dependencies
- Simple API
- Vue 2 support available
- Fast performance

**Limitations:**
- No built-in minimap
- Simpler edge routing
- More manual setup required
- No drag-and-drop from palette (click to add)

---

## React Demos

### 3. React Flow Demo
**Location:** `react-flow-demo/`
**Port:** 3000
**Framework:** React 18

A modern, feature-rich implementation using React Flow (xyflow), demonstrating a production-ready BPM process modeler.

**Features:**
- Infinite canvas with pan & zoom
- Drag & drop node palette
- Custom node types (Start/End, Action, Decision)
- Visual connection of nodes
- Mini-map for navigation
- Background grid with dots pattern
- Professional UI/UX
- Node selection and deletion
- Smooth animations

**Tech Stack:**
- React 18
- @xyflow/react 12.x
- Vite
- Zustand (state management)

---

## Framework-Agnostic Demos

### 4. BPMN.js Demo
**Location:** `bpmn-js-demo/`
**Port:** 3001
**Framework:** Vanilla JavaScript (works with any framework)

A standards-compliant BPMN 2.0 modeler using the official bpmn-js library from Camunda. Can be integrated with Vue or React.

**Features:**
- Full BPMN 2.0 notation support
- Standard BPMN elements (Events, Tasks, Gateways, Flows, Pools, Lanes)
- XML import/export (BPMN format)
- SVG export
- Industry-standard diagram validation
- Built-in palette with all BPMN elements
- Professional modeling tools

**Tech Stack:**
- Vanilla JavaScript
- bpmn-js 17.x
- Vite

**Integration Note:** Can be wrapped in Vue or React components

---

### 5. Vanilla Canvas Demo (Educational)
**Location:** `vanilla-canvas-demo/`
**Port:** Simple HTTP server (8000)
**Framework:** None (Pure HTML5 Canvas)

A bare-bones implementation using only HTML5 Canvas and vanilla JavaScript, demonstrating the complexity of building from scratch.

**Features:**
- Basic node creation (Start, Action, Decision, End)
- Simple drag & drop
- Node connections
- Static grid background
- Basic node deletion

**Limitations (by design):**
- No zoom/pan functionality
- No edge routing or bezier curves
- No undo/redo
- No serialization/export
- Limited styling options
- No viewport transformations
- Manual connection mode

**Purpose:** Demonstrates why using a library is recommended over building from scratch.

**Tech Stack:**
- Pure HTML5 Canvas
- Vanilla JavaScript
- No dependencies

---

## Installation & Running

### Prerequisites
- Node.js 18+ (for all demos except Vanilla Canvas)
- npm or yarn

### Vue Flow Demo (RECOMMENDED FOR VUE.JS)

```bash
cd vue-flow-demo
npm install
npm run dev
```

Open http://localhost:3002

### Drawflow Demo (Lightweight Vue Alternative)

```bash
cd drawflow-demo
npm install
npm run dev
```

Open http://localhost:3003

### React Flow Demo

```bash
cd react-flow-demo
npm install
npm run dev
```

Open http://localhost:3000

### BPMN.js Demo

```bash
cd bpmn-js-demo
npm install
npm run dev
```

Open http://localhost:3001

### Vanilla Canvas Demo

No build step required. Simply open in a browser:

```bash
cd vanilla-canvas-demo
# Option 1: Use Python's built-in server
python3 -m http.server 8000

# Option 2: Use Node's http-server
npx http-server -p 8000

# Option 3: Just open index.html in your browser
```

Open http://localhost:8000

---

## Demo Comparison

| Feature | Vue Flow | Drawflow | React Flow | BPMN.js | Vanilla |
|---------|----------|----------|------------|---------|---------|
| **Framework** | Vue 3 | Vue 2/3 | React 18 | Any | None |
| **Bundle Size** | Medium | **9.28 kB** | Medium | Medium | Tiny |
| **Ease of Setup** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Feature Richness** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| **Production Ready** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐ |
| **Customization** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **BPMN Standards** | ⭐⭐⭐ | ⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐ |
| **Development Speed** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐ |
| **Dev Time** | 44 hours | 75 hours | 44 hours | 80 hours | 320+ hours |
| **Active Maintenance** | ✅ | ✅ | ✅ | ✅ | DIY |

---

## Usage Instructions

### Vue Flow Demo

1. **Add Nodes:** Drag node types from the left sidebar onto the canvas
2. **Connect Nodes:** Drag from a node's handle (connection point) to another node
3. **Move Nodes:** Click and drag nodes to reposition
4. **Pan Canvas:** Click and drag on empty canvas space
5. **Zoom:** Use mouse wheel to zoom in/out
6. **Delete:** Select a node and press Delete key
7. **Mini-map:** Use the mini-map in bottom-right to navigate large diagrams

### Drawflow Demo

1. **Add Nodes:** Click buttons in the left sidebar to add nodes
2. **Move Nodes:** Drag nodes to reposition
3. **Connect Nodes:** Click output dot on source node, then click target node
4. **Zoom:** Ctrl + Mouse Wheel to zoom
5. **Export:** Click "Export Data" to see JSON structure
6. **Clear:** Click "Clear All" to reset canvas

### React Flow Demo

1. **Add Nodes:** Drag node types from the left sidebar onto the canvas
2. **Connect Nodes:** Drag from a node's handle (connection point) to another node
3. **Move Nodes:** Click and drag nodes to reposition
4. **Pan Canvas:** Click and drag on empty canvas space
5. **Zoom:** Use mouse wheel to zoom in/out
6. **Delete:** Select a node and press Delete key
7. **Mini-map:** Use the mini-map in bottom-right to navigate large diagrams

### BPMN.js Demo

1. **Add Elements:** Click elements from the palette on the left
2. **Connect:** Click the connection tool, then click source and target elements
3. **Edit Properties:** Click elements to see properties
4. **Pan:** Use hand tool from palette or hold space and drag
5. **Zoom:** Use zoom controls in header or mouse wheel
6. **Export:** Click "Download BPMN" for XML or "Download SVG" for image

### Vanilla Canvas Demo

1. **Add Nodes:** Click buttons in the left sidebar to add nodes at random positions
2. **Move Nodes:** Click and drag nodes (default mode)
3. **Connect Nodes:**
   - Click "Toggle Connect Mode"
   - Click the first node (source)
   - Click the second node (target)
   - Toggle back to move mode
4. **Delete:** Right-click on a node
5. **Clear All:** Click "Clear Canvas" button

---

## Key Takeaways

### Vue Flow Advantages (for Vue.js users)
- Native Vue 3 components and Composition API
- Custom nodes are `.vue` files
- Active development with regular updates
- Out-of-the-box features save weeks of development
- Highly customizable while providing great defaults
- Performance optimized for large graphs
- Same benefits as React Flow but for Vue

### Drawflow Advantages
- Extremely lightweight (9.28 kB)
- Zero dependencies
- Works with Vue 2 and Vue 3
- Simple and easy to learn
- Perfect for projects with strict bundle size requirements

### React Flow Advantages (for React users)
- Official xyflow team support
- Most mature and feature-rich
- Excellent documentation and community
- Pro tier with 1:1 support available
- Regular updates and active development

### BPMN.js Advantages
- Industry-standard BPMN 2.0 compliance
- Enterprise-grade from Camunda
- Interoperability with other BPMN tools
- XML import/export for workflow engines

### Vanilla Canvas Reality Check
- Building from scratch takes **significantly more time**
- Missing critical features (zoom, pan, edge routing, undo/redo)
- More bugs and edge cases to handle
- No community support or updates
- Higher maintenance burden
- Not recommended unless extremely specific requirements

---

## Recommendation by Framework

### If you're using **Vue.js**: Vue Flow ⭐

For Vue.js projects, **Vue Flow is the clear winner** because:

1. **Native Vue 3:** Custom nodes are Vue components, uses Composition API
2. **Development Speed:** Get a working prototype in hours, not weeks
3. **Feature Complete:** All essential features built-in
4. **Well Supported:** Active development, great docs, responsive community
5. **Future Proof:** Regular updates and improvements
6. **Node-RED Like UX:** Can easily replicate the Node-RED grid experience

**Alternative:** Drawflow if bundle size < 50 kB is critical

### If you're using **React**: React Flow ⭐

For React projects, **React Flow is the clear winner** for the same reasons, plus:
- Official xyflow team maintenance
- Pro tier available
- Larger community

### If you need **BPMN 2.0 Compliance**: BPMN.js

Choose BPMN.js when:
- Need strict BPMN 2.0 standard compliance
- Integration with Camunda or other BPMN engines
- Enterprise BPM with governance requirements
- XML format for workflow execution engines

---

## Next Steps

1. **Test the Demos:** Run all demos to experience the differences
2. **Customize Your Choice:**
   - For Vue.js: Modify Vue Flow demo with your specific BPM node types
   - For React: Modify React Flow demo with your specific BPM node types
3. **Integrate with Backend:** Connect to your FastAPI backend for saving/loading workflows
4. **Add Features:** Consider adding:
   - Node property editors
   - Workflow validation
   - Export to various formats
   - Collaboration features
   - Version control

---

## Resources

### Vue Flow
- Documentation: https://vueflow.dev
- Examples: https://vueflow.dev/examples/
- GitHub: https://github.com/bcakmakoglu/vue-flow
- Discord: Vue Flow community

### Drawflow
- GitHub: https://github.com/jerosoler/Drawflow
- NPM: drawflow

### React Flow
- Documentation: https://reactflow.dev
- Examples: https://reactflow.dev/examples
- GitHub: https://github.com/xyflow/xyflow
- Discord: https://discord.gg/Bqt6xrs

### BPMN.js
- Documentation: https://bpmn.io/toolkit/bpmn-js/
- Walkthrough: https://bpmn.io/toolkit/bpmn-js/walkthrough/
- GitHub: https://github.com/bpmn-io/bpmn-js

### General Resources
- Node-RED (inspiration): https://nodered.org
- BPMN 2.0 Specification: https://www.omg.org/spec/BPMN/
- Canvas API: https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API

---

## License

These demos are for evaluation and educational purposes. Check individual library licenses:
- Vue Flow: MIT License
- Drawflow: MIT License
- React Flow: MIT License
- BPMN.js: bpmn.io License (open source)
- Vanilla demo: Public domain
