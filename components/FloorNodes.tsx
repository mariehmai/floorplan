import * as React from 'react';
import { type Node } from 'react-flow-renderer';
import cn from 'classnames';

type BaseNode = Pick<Node, 'selected'> & {
  baseClassName?: string;
};

type FloorNode<TNodeData> = {
  data: TNodeData;
} & BaseNode;

function NodeWrapper({
  baseClassName = '',
  selected,
  children,
}: React.PropsWithChildren<BaseNode>) {
  return (
    <div
      className={cn(baseClassName, {
        'border-emerald-400 bg-opacity-80': selected,
      })}
    >
      {children}
    </div>
  );
}

type Desk = {
  onChange: () => void;
};

export const DeskNode = React.memo(function ({ ...props }: FloorNode<Desk>) {
  return (
    <NodeWrapper
      {...props}
      baseClassName="h-[300px] w-[150px] rounded-md border-2 border-stone-700 bg-white p-2"
    />
  );
});

DeskNode.displayName = 'DeskNode';

type Seat = BaseNode & {
  onChange: () => void;
};

export const SeatNode = React.memo(function ({ ...props }: FloorNode<Seat>) {
  return (
    <NodeWrapper
      {...props}
      baseClassName="h-[20px] w-[20px] rounded-md border-2 border-stone-700 bg-white p-2"
    />
  );
});

SeatNode.displayName = 'SeatNode';
