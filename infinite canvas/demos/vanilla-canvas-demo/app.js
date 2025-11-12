// Simple vanilla JS node editor - demonstrates complexity without libraries

class Node {
  constructor(id, type, x, y, label) {
    this.id = id;
    this.type = type;
    this.x = x;
    this.y = y;
    this.label = label;
    this.width = 120;
    this.height = 60;
  }

  contains(x, y) {
    return x >= this.x && x <= this.x + this.width &&
           y >= this.y && y <= this.y + this.height;
  }

  draw(ctx, isSelected) {
    // Set colors based on type
    let fillColor, borderColor;
    switch (this.type) {
      case 'start':
        fillColor = '#d1fae5';
        borderColor = '#10b981';
        break;
      case 'action':
        fillColor = '#dbeafe';
        borderColor = '#3b82f6';
        break;
      case 'decision':
        fillColor = '#fed7aa';
        borderColor = '#f59e0b';
        break;
      case 'end':
        fillColor = '#fee2e2';
        borderColor = '#ef4444';
        break;
      default:
        fillColor = '#f1f5f9';
        borderColor = '#64748b';
    }

    // Draw shadow
    ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
    ctx.shadowBlur = 8;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 4;

    // Draw node background
    ctx.fillStyle = fillColor;
    ctx.strokeStyle = isSelected ? '#3b82f6' : borderColor;
    ctx.lineWidth = isSelected ? 3 : 2;

    if (this.type === 'start' || this.type === 'end') {
      // Draw circle for start/end
      ctx.beginPath();
      ctx.arc(this.x + this.width / 2, this.y + this.height / 2,
              this.width / 2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    } else if (this.type === 'decision') {
      // Draw diamond for decision
      ctx.beginPath();
      ctx.moveTo(this.x + this.width / 2, this.y);
      ctx.lineTo(this.x + this.width, this.y + this.height / 2);
      ctx.lineTo(this.x + this.width / 2, this.y + this.height);
      ctx.lineTo(this.x, this.y + this.height / 2);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    } else {
      // Draw rectangle for action
      ctx.beginPath();
      ctx.roundRect(this.x, this.y, this.width, this.height, 8);
      ctx.fill();
      ctx.stroke();
    }

    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;

    // Draw label
    ctx.fillStyle = '#1e293b';
    ctx.font = 'bold 14px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.label, this.x + this.width / 2, this.y + this.height / 2);
  }
}

class Connection {
  constructor(fromNode, toNode) {
    this.fromNode = fromNode;
    this.toNode = toNode;
  }

  draw(ctx) {
    const fromX = this.fromNode.x + this.fromNode.width / 2;
    const fromY = this.fromNode.y + this.fromNode.height / 2;
    const toX = this.toNode.x + this.toNode.width / 2;
    const toY = this.toNode.y + this.toNode.height / 2;

    // Draw simple line connection
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.moveTo(fromX, fromY);
    ctx.lineTo(toX, toY);
    ctx.stroke();

    // Draw arrow head
    const angle = Math.atan2(toY - fromY, toX - fromX);
    const arrowSize = 10;

    ctx.fillStyle = '#64748b';
    ctx.beginPath();
    ctx.moveTo(toX, toY);
    ctx.lineTo(
      toX - arrowSize * Math.cos(angle - Math.PI / 6),
      toY - arrowSize * Math.sin(angle - Math.PI / 6)
    );
    ctx.lineTo(
      toX - arrowSize * Math.cos(angle + Math.PI / 6),
      toY - arrowSize * Math.sin(angle + Math.PI / 6)
    );
    ctx.closePath();
    ctx.fill();
  }
}

class SimpleNodeEditor {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.nodes = [];
    this.connections = [];
    this.selectedNode = null;
    this.draggingNode = null;
    this.connectMode = false;
    this.firstConnectionNode = null;
    this.nodeCounter = 0;

    this.resizeCanvas();
    this.setupEventListeners();
    this.render();
  }

  resizeCanvas() {
    const rect = this.canvas.parentElement.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    this.render();
  }

  setupEventListeners() {
    window.addEventListener('resize', () => this.resizeCanvas());

    this.canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
    this.canvas.addEventListener('contextmenu', (e) => this.handleContextMenu(e));

    // Node creation buttons
    document.querySelectorAll('.palette-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const type = btn.dataset.nodeType;
        this.addNode(type);
      });
    });

    // Clear button
    document.getElementById('clear-canvas').addEventListener('click', () => {
      if (confirm('Clear all nodes and connections?')) {
        this.nodes = [];
        this.connections = [];
        this.nodeCounter = 0;
        this.render();
      }
    });

    // Connect mode toggle
    document.getElementById('connect-mode').addEventListener('click', () => {
      this.toggleConnectMode();
    });
  }

  getMousePos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }

  handleMouseDown(e) {
    const pos = this.getMousePos(e);
    const clickedNode = this.findNodeAt(pos.x, pos.y);

    if (this.connectMode && clickedNode) {
      this.handleConnectionClick(clickedNode);
    } else if (clickedNode) {
      this.selectedNode = clickedNode;
      this.draggingNode = clickedNode;
      this.dragOffset = {
        x: pos.x - clickedNode.x,
        y: pos.y - clickedNode.y
      };
    } else {
      this.selectedNode = null;
    }

    this.render();
  }

  handleMouseMove(e) {
    if (this.draggingNode && !this.connectMode) {
      const pos = this.getMousePos(e);
      this.draggingNode.x = pos.x - this.dragOffset.x;
      this.draggingNode.y = pos.y - this.dragOffset.y;
      this.render();
    }
  }

  handleMouseUp(e) {
    this.draggingNode = null;
  }

  handleContextMenu(e) {
    e.preventDefault();
    const pos = this.getMousePos(e);
    const clickedNode = this.findNodeAt(pos.x, pos.y);

    if (clickedNode) {
      if (confirm('Delete this node?')) {
        this.deleteNode(clickedNode);
      }
    }
  }

  handleConnectionClick(node) {
    if (!this.firstConnectionNode) {
      this.firstConnectionNode = node;
      this.selectedNode = node;
      this.render();
    } else {
      if (this.firstConnectionNode !== node) {
        this.addConnection(this.firstConnectionNode, node);
      }
      this.firstConnectionNode = null;
      this.selectedNode = null;
      this.render();
    }
  }

  toggleConnectMode() {
    this.connectMode = !this.connectMode;
    this.firstConnectionNode = null;
    this.selectedNode = null;

    const modeText = document.getElementById('current-mode');
    const modeBtn = document.getElementById('connect-mode');

    if (this.connectMode) {
      modeText.textContent = 'Connect';
      modeBtn.classList.add('active');
    } else {
      modeText.textContent = 'Move';
      modeBtn.classList.remove('active');
    }

    this.render();
  }

  findNodeAt(x, y) {
    // Search in reverse order to prioritize top nodes
    for (let i = this.nodes.length - 1; i >= 0; i--) {
      if (this.nodes[i].contains(x, y)) {
        return this.nodes[i];
      }
    }
    return null;
  }

  addNode(type) {
    const labels = {
      start: 'Start',
      action: 'Action',
      decision: 'Decision',
      end: 'End'
    };

    const node = new Node(
      ++this.nodeCounter,
      type,
      Math.random() * (this.canvas.width - 200) + 50,
      Math.random() * (this.canvas.height - 200) + 50,
      `${labels[type]} ${this.nodeCounter}`
    );

    this.nodes.push(node);
    this.render();
  }

  addConnection(fromNode, toNode) {
    // Check if connection already exists
    const exists = this.connections.some(c =>
      c.fromNode === fromNode && c.toNode === toNode
    );

    if (!exists) {
      this.connections.push(new Connection(fromNode, toNode));
    }
  }

  deleteNode(node) {
    // Remove node
    this.nodes = this.nodes.filter(n => n !== node);

    // Remove connections involving this node
    this.connections = this.connections.filter(c =>
      c.fromNode !== node && c.toNode !== node
    );

    this.selectedNode = null;
    this.render();
  }

  render() {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw background grid
    this.drawGrid();

    // Draw connections first (behind nodes)
    this.connections.forEach(connection => {
      connection.draw(this.ctx);
    });

    // Draw nodes
    this.nodes.forEach(node => {
      node.draw(this.ctx, node === this.selectedNode);
    });

    // Draw connection preview
    if (this.connectMode && this.firstConnectionNode) {
      this.ctx.save();
      this.ctx.strokeStyle = '#3b82f6';
      this.ctx.lineWidth = 2;
      this.ctx.setLineDash([5, 5]);

      const centerX = this.firstConnectionNode.x + this.firstConnectionNode.width / 2;
      const centerY = this.firstConnectionNode.y + this.firstConnectionNode.height / 2;

      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, this.firstConnectionNode.width / 2 + 10, 0, Math.PI * 2);
      this.ctx.stroke();

      this.ctx.restore();
    }
  }

  drawGrid() {
    const gridSize = 20;
    this.ctx.strokeStyle = '#e2e8f0';
    this.ctx.lineWidth = 1;

    for (let x = 0; x < this.canvas.width; x += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.canvas.height);
      this.ctx.stroke();
    }

    for (let y = 0; y < this.canvas.height; y += gridSize) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.canvas.width, y);
      this.ctx.stroke();
    }
  }
}

// Initialize the editor
const canvas = document.getElementById('canvas');
const editor = new SimpleNodeEditor(canvas);
