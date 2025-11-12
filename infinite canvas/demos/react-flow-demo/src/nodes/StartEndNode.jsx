import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';

const StartEndNode = ({ data, isConnectable }) => {
  const isStart = data.nodeType === 'start';

  return (
    <div className={`start-end-node custom-node ${isStart ? 'start' : 'end'}`}>
      {!isStart && (
        <Handle
          type="target"
          position={Position.Top}
          isConnectable={isConnectable}
        />
      )}
      <div className="start-end-content">
        <span className="node-icon">{isStart ? '▶️' : '⏹️'}</span>
        <strong>{data.label}</strong>
      </div>
      {isStart && (
        <Handle
          type="source"
          position={Position.Bottom}
          isConnectable={isConnectable}
        />
      )}
    </div>
  );
};

export default memo(StartEndNode);
