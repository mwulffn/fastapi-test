import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

const DecisionNode = ({ data, isConnectable }) => {
  return (
    <div className="decision-node custom-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="decision-content">
        <span className="node-icon">◆</span>
        <strong>{data.label}</strong>
      </div>
      <Handle
        type="source"
        position={Position.Right}
        id="yes"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="no"
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="default"
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(DecisionNode);
