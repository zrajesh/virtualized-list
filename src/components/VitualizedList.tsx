import { useState } from 'react';

const itemHeight = 35; // Adjustable global variable
const windowHeight = 500; // Adjustable global variable
const bufferItems = 20; // Number of buffer items to render before the visible range

export const VirtualizedList = ({
  numberOfItems,
}: {
  numberOfItems: number;
}) => {
  const [scrollTop, setScrollTop] = useState(0);
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - bufferItems);
  let renderedNodesCount = Math.floor(windowHeight / itemHeight) + 2 * bufferItems;
  renderedNodesCount = Math.min(numberOfItems - startIndex, renderedNodesCount);

  const generateRows = () => {
    const nodeItems: JSX.Element[] = [];
    for (let i = 0; i < renderedNodesCount; i++) {
      const index = i + startIndex;
      nodeItems.push(<ListItem key={index} index={index} />);
    }

    return nodeItems;
  };

  return (
    <div
      className="overflow-y-scroll w-full border-2 border-black"
      style={{ height: `${windowHeight}px` }}
      onScroll={(e) => {
        setScrollTop(e.currentTarget.scrollTop);
      }}
    >
      <div
        style={{
          height: `${numberOfItems * itemHeight}px`,
        }}
      >
        <div
          style={{
            transform: `translateY(${startIndex * itemHeight}px)`,
          }}
        >
          {generateRows()}
        </div>
      </div>
    </div>
  );
};

const ListItem = ({ index }: { index: number }) => {
  return (
    <div
      style={{
        height: `${itemHeight}px`,
        backgroundColor: index % 2 === 0 ? '#f0f0f0' : '#ffffff',
      }}
      className="text-center w-full text-black"
    >
      List Item Index - {index}
    </div>
  );
};