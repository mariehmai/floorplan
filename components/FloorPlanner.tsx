import * as React from 'react';
import ReactFlow, {
  MiniMap,
  Controls,
  type Node,
  type Edge,
  Background,
  BackgroundVariant,
} from 'react-flow-renderer';

type FloorPlannerProps = {
  nodes: Node[];
  edges: Edge[];
};

function Flow({ nodes, edges }: FloorPlannerProps) {
  return (
    <ReactFlow defaultNodes={nodes} defaultEdges={edges} snapToGrid>
      <Background variant={BackgroundVariant.Dots} gap={12} />
      <MiniMap />
      <Controls />
    </ReactFlow>
  );
}

export function FloorPlanner() {
  const [nodes, _setNodes] = React.useState([]);
  const [edges, _setEdges] = React.useState([]);

  return (
    <div className="h-[100vh] w-full">
      <Flow nodes={nodes} edges={edges} />
    </div>
  );
}
