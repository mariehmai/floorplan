import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  Controls,
  BackgroundVariant,
  Background,
  MiniMap,
  type Node,
  type ReactFlowInstance,
} from 'react-flow-renderer';
import { DeskNode, SeatNode } from './FloorNodes';
import { Sidebar } from './Sidebar';

const initialNodes = [
  {
    id: '2',
    type: 'deskNode',
    data: { onChange: () => {} },
    position: { x: 300, y: 50 },
  },
];

const nodeTypes = {
  deskNode: DeskNode,
  seatNode: SeatNode,
};

let id = 0;
const getId = () => `dndnode_${id++}`;

export function Flow() {
  const reactFlowWrapper = useRef<HTMLInputElement>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [reactFlowInstance, setReactFlowInstance] =
    useState<ReactFlowInstance | null>(null);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: getId(),
        type,
        position,
        data: { label: `${type} node` },
      } as Node;

      setNodes((nds) => nds.concat(newNode));
    },
    [setNodes, reactFlowInstance]
  );

  return (
    <ReactFlowProvider>
      <Sidebar />
      <div className="h-full w-full" ref={reactFlowWrapper}>
        <ReactFlow
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onInit={setReactFlowInstance}
          onDrop={onDrop}
          onDragOver={onDragOver}
          fitView
          snapToGrid
        >
          <Background variant={BackgroundVariant.Dots} gap={12} />
          <MiniMap />
          <Controls />
        </ReactFlow>
      </div>
    </ReactFlowProvider>
  );
}

export function FloorPlanner() {
  return (
    <div className="h-[100vh] w-full">
      <Flow />
    </div>
  );
}
