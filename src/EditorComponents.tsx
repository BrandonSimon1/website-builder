import React from "react";
import { useDrag, useDrop } from "react-dnd";
import { themeObjectTypes } from "./BaseComponents";
import { GRIDSIZE } from "./constants";

const accept = ["GridContainer", "ContentContainer", "TextField", "ImageField"];

interface Point {
  x: number;
  y: number;
}

interface Rect extends Point {
  width: number;
  height: number;
}
interface GridStart {
  gridColumnStart: number;
  gridRowStart: number;
}
interface GridPosition {
  gridColumnStart: number;
  gridColumnEnd: number;
  gridRowStart: number;
  gridRowEnd: number;
}

const pointAdd = ({ x: x1, y: y1 }: Point, { x: x2, y: y2 }: Point): Point => ({
  x: x2 + x1,
  y: y2 + y1
});

const pointScale = ({ x, y }: Point, a: number): Point => ({
  x: x * a,
  y: y * a
});

const getNewGridStart = (dragOffset: Point, dropRect: Rect) => {
  const offset = pointAdd(dragOffset, pointScale(dropRect, -1));
  return {
    gridRowStart: Math.floor(GRIDSIZE * (offset.y / dropRect.height)),
    gridColumnStart: Math.floor(GRIDSIZE * (offset.x / dropRect.width))
  };
};

const getNewGridPosition = (
  oldGridPosition: GridPosition,
  newGridStart: GridStart
) => {
  const oldWidth =
    oldGridPosition.gridColumnEnd - oldGridPosition.gridColumnStart;
  const oldHeight = oldGridPosition.gridRowEnd - oldGridPosition.gridRowStart;
  const newGridPosition = {
    gridRowStart: newGridStart.gridRowStart,
    gridRowEnd: newGridStart.gridRowStart + oldHeight,
    gridColumnStart: newGridStart.gridColumnStart,
    gridColumnEnd: newGridStart.gridColumnStart + oldWidth
  };
  if (newGridPosition.gridRowEnd > 12 || newGridPosition.gridColumnEnd > 12) {
    throw new Error("wrong");
  } else {
    return newGridPosition;
  }
};

const GridContainer = ({ style: oldStyle, ...props }: any) => {
  const { GridContainer } = themeObjectTypes;
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    item: { type: "GridContainer", id: props.id, style: props.style },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  }));
  const [{ isOver, offset }, drop] = useDrop(() => ({
    accept,
    collect: (monitor) => ({
      isOver: monitor.isOver({ shallow: true }),
      offset: monitor.getSourceClientOffset()
    })
  }));
  const dragDropRef = (el: HTMLElement) => {
    drag(el);
    drop(el);
  };
  if (isDragging) {
    return <GridContainer ref={preview} {...props} style={oldStyle} />;
  } else if (isOver) {
    const dropRectRef: { current?: HTMLElement } = {};
    const dropRef = (el: HTMLElement) => {
      drop(el);
      dropRectRef.current = el;
    };
    if (dropRectRef.current && offset) {
      const dropRect: Rect = dropRectRef.current.getBoundingClientRect();
      const newStyle = {
        ...oldStyle,
        ...getNewGridPosition(oldStyle, getNewGridStart(offset, dropRect))
      };
      return <GridContainer ref={dropRef} {...props} style={newStyle} />;
    } else {
      return <GridContainer ref={dropRef} {...props} style={oldStyle} />;
    }
  } else {
    return <GridContainer ref={dragDropRef} {...props} style={oldStyle} />;
  }
};

const ContentContainer = (props) => {
  const { ContentContainer } = themeObjectTypes;
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    item: { type: "ContentContainer", id: props.id, style: props.style },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  }));
  const [{ isOver }, drop] = useDrop(() => ({
    accept,
    collect: (monitor) => ({ isOver: monitor.isOver({ shallow: true }) })
  }));
  if (isDragging) {
    return <ContentContainer ref={preview} {...props} />;
  } else if (isOver) {
    return <ContentContainer ref={drop} {...props} />;
  } else {
    return <ContentContainer ref={drag} {...props} />;
  }
};

const TextField = (props) => {
  const { TextField } = themeObjectTypes;
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    item: { type: "TextField", id: props.id, style: props.style },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  }));
  if (isDragging) {
    return <TextField ref={preview} {...props} />;
  } else {
    return <TextField ref={drag} {...props} />;
  }
};

const ImageField = (props) => {
  const { ImageField } = themeObjectTypes;
  const [{ isDragging }, drag, preview] = useDrag(() => ({
    item: { type: "ImageField", id: props.id, style: props.style },
    collect: (monitor) => ({ isDragging: monitor.isDragging() })
  }));
  if (isDragging) {
    return <ImageField ref={preview} {...props} />;
  } else {
    return <ImageField ref={drag} {...props} />;
  }
};

export const editorThemeObjectTypes = {
  GridContainer,
  ContentContainer,
  TextField,
  ImageField
};
