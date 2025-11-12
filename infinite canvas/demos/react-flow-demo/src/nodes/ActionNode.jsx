import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

const ActionNode = ({ data, isConnectable }) => {
  return (
    <div className="action-node custom-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div className="node-header">
        <span className="node-icon">📋</span>
        <strong>{data.label}</strong>
      </div>
      {data.description && (
        <div className="node-description">{data.description}</div>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(ActionNode);
