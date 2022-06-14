import * as React from 'react';

export function Sidebar() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <aside className="absolute top-2 left-2 z-10 flex max-h-[75vh] w-40 flex-col gap-2 overflow-scroll rounded-md bg-slate-50 p-4">
      <div
        className="cursor-grab rounded-md border-2 border-stone-700 bg-white p-2"
        onDragStart={(event) => onDragStart(event, 'deskNode')}
        draggable
      >
        Desk
      </div>
      <div
        className="w-fit cursor-grab rounded-md border-2 border-stone-700 bg-white p-2"
        onDragStart={(event) => onDragStart(event, 'seatNode')}
        draggable
      >
        Seat
      </div>
    </aside>
  );
}
