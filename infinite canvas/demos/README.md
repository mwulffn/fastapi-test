# Infinite Canvas Demos for BPM Process Modeling

This folder contains three different implementations of infinite canvas/node-based editors for BPM process modeling, demonstrating different approaches and technologies.

## Demos Overview

### 1. React Flow Demo (RECOMMENDED)
**Location:** `react-flow-demo/`
**Port:** 3000

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

### 2. BPMN.js Demo
**Location:** `bpmn-js-demo/`
**Port:** 3001

A standards-compliant BPMN 2.0 modeler using the official bpmn-js library from Camunda.

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

---

### 3. Vanilla Canvas Demo
**Location:** `vanilla-canvas-demo/`
**Port:** Simple HTTP server

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
- Node.js 18+ (for React Flow and BPMN.js demos)
- npm or yarn

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

| Feature | React Flow | BPMN.js | Vanilla Canvas |
|---------|-----------|---------|----------------|
| **Ease of Setup** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Feature Richness** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |
| **Production Ready** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐ |
| **Customization** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **BPMN Standards** | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐ |
| **Development Speed** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐ |
| **Learning Curve** | ⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐⭐ |
| **Bundle Size** | Medium | Medium | Tiny |
| **Dependencies** | React | None (vanilla) | None |
| **Maintenance** | Active | Active | DIY |

---

## Usage Instructions

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

### React Flow Advantages
- Modern, well-maintained library
- Excellent documentation and community
- Out-of-the-box features save weeks of development
- Highly customizable while providing great defaults
- TypeScript support
- Performance optimized for large graphs
- Regular updates and active development

### BPMN.js Advantages
- Industry-standard BPMN 2.0 compliance
- Enterprise-grade from Camunda
- Interoperability with other BPMN tools
- XML import/export for workflow engines
- Comprehensive BPMN element library
- Validation and compliance checking

### Vanilla Canvas Reality Check
- Building from scratch takes **significantly more time**
- Missing critical features (zoom, pan, edge routing, undo/redo)
- More bugs and edge cases to handle
- No community support or updates
- Higher maintenance burden
- Not recommended unless extremely specific requirements

---

## Recommendation

**For this BPM process modeling project, React Flow is the recommended choice.**

### Why React Flow?

1. **Development Speed:** Get a working prototype in hours, not weeks
2. **Feature Complete:** All essential features built-in
3. **Customizable:** Can create custom node types that match your BPM domain
4. **Well Supported:** Active development, great docs, responsive community
5. **Production Ready:** Used by many companies in production
6. **Future Proof:** Regular updates and improvements
7. **Node-RED Like UX:** Can easily replicate the Node-RED grid experience

### When to Choose BPMN.js Instead

- Need strict BPMN 2.0 standard compliance
- Integration with Camunda or other BPMN engines
- Enterprise BPM with governance requirements
- Need XML format for workflow execution engines
- Industry regulations require BPMN notation

### When to Build Custom (Vanilla)

- Extremely unique requirements not met by libraries
- Bundle size is absolutely critical (< 50kb total)
- You have significant time and resources for development
- Need something very simple (much simpler than these demos)

---

## Next Steps

1. **Test the Demos:** Run all three demos to experience the differences
2. **Customize React Flow:** Modify the React Flow demo to add your specific BPM node types
3. **Integrate with Backend:** Connect to your FastAPI backend for saving/loading workflows
4. **Add Features:** Consider adding:
   - Node property editors
   - Workflow validation
   - Export to various formats
   - Collaboration features
   - Version control

---

## Resources

### React Flow
- Documentation: https://reactflow.dev
- Examples: https://reactflow.dev/examples
- GitHub: https://github.com/xyflow/xyflow

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
- React Flow: MIT License
- BPMN.js: bpmn.io License
- Vanilla demo: Public domain
