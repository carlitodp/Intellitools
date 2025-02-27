import React, { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Image, Transformer } from 'react-konva';

// Define the interface for individual rectangle annotations.
export interface RectangleData {
  x: number;
  y: number;
  width: number;
  height: number;
  class_: string;
}

// Define the ImageData interface, ensuring annotations is always an array.
export interface ImageData {
  file?: File;
  path?: string;
  index?: number;
  annotations: RectangleData[];
}

interface Props {
  width: number;
  height: number;
  imageData?: ImageData;
  onAnnotationChange: (annotations?: RectangleData[]) => void;
  selectedClass:string;
}

function Canva({ width, height, imageData, onAnnotationChange, selectedClass }: Props) {
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [newRectangle, setNewRectangle] = useState<RectangleData | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const stageRef = useRef<any>(null);
  const trRef = useRef<any>(null);
  const [img, setImg] = useState<HTMLImageElement>();

  const [colors, setColorList] = useState(["red", "blue", "green", "yellow", "orange", "purple", "cyan", "magenta", "brown", "gray"])
  const [colorMap, setColorMap] = useState(new Map<string, string>());

  useEffect(() => {
    if (imageData?.file) {
      const reader = new FileReader();
      reader.onload = () => {
        const image = new window.Image();
        image.src = reader.result as string;
        image.onload = () => {
          setImg(image);
        };
      };
      reader.readAsDataURL(imageData.file);
    }
  }, [imageData?.file]);

  useEffect(() => {
    setSelectedId(null);
    if (trRef.current) {
      trRef.current.nodes([]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [imageData])

  useEffect(() => {
    if (selectedId !== null && trRef.current && stageRef.current) {
      const selectedNode = stageRef.current.findOne(`#rect${selectedId}`);
      if (selectedNode) {
        trRef.current.nodes([selectedNode]);
        trRef.current.getLayer()?.batchDraw();
      }
    } else if (trRef.current) {
      trRef.current.nodes([]);
      trRef.current.getLayer()?.batchDraw();
    }
  }, [selectedId, imageData?.annotations]);

  const handleMouseDown = (e: any) => {
    if (!img) return;
    // Only start drawing if clicking on an empty area.
    if (e.target === e.target.getStage() && selectedClass!="Select Class") {

      setSelectedId(null);
      setIsDrawing(true);
      const pointerPos = e.target.getStage().getPointerPosition();
      if (pointerPos) {
        const { x, y } = pointerPos;
        setNewRectangle({ x, y, width: 0, height: 0, class_: selectedClass });
      }
    }
  };

  const handleMouseMove = (e: any) => {
    if (!isDrawing || !newRectangle) return;
    const pointerPos = e.target.getStage().getPointerPosition();
    if (pointerPos) {
      const { x, y } = pointerPos;
      setNewRectangle({
        ...newRectangle,
        width: x - newRectangle.x,
        height: y - newRectangle.y,
      });
    }
  };

  const handleContextMenu = (e: any) => {
  e.evt.preventDefault();
  if (selectedId !== null && imageData) {
    // Create a new array with the selected annotation removed.
    const newAnnotations = imageData.annotations.filter(
      (_, index) => index !== selectedId
    );
    onAnnotationChange(newAnnotations);
    // Clear the selection after deletion.
    setSelectedId(null);
  }
};

  const handleMouseUp = () => {
  if (isDrawing && newRectangle) {

    setColorMap((prevMap) => {
      if (prevMap.has(selectedClass)) return prevMap; // Prevent redundant updates
    
      const col = colors.length > 0 ? colors[Math.floor(Math.random() * colors.length)] : 'defaultColor'; // Fallback color
      const newColorList = colors.filter((color) => color !== col);
    
      setColorList(newColorList);
      const newMap = new Map(prevMap);
      newMap.set(selectedClass, col);
      return newMap;
    });

    console.log(colorMap)
    // Create a new array instead of mutating the original one
    const newAnnotations = imageData?.annotations
      ? [...imageData.annotations, newRectangle]
      : [newRectangle];
    onAnnotationChange(newAnnotations);
    setNewRectangle(null);
    setIsDrawing(false);
  }
}

const onDragEnd = (e: any, i: number) => {
  const node = e.target;

  // Ensure imageData and annotations exist
  if (!imageData || !imageData.annotations) return;

  const updatedRect: RectangleData = {
    x: node.x(),
    y: node.y(),
    width: node.width() * node.scaleX(),
    height: node.height() * node.scaleY(),
    class_: selectedClass
  };

  node.scaleX(1);
  node.scaleY(1);

  // Ensure index `i` is valid
  if (i < 0 || i >= imageData.annotations.length) return;

  // Use spread operator to create a new array reference
  const updatedAnnotations = [...imageData.annotations];
  updatedAnnotations[i] = { ...updatedRect }; // Ensure a new object reference

  onAnnotationChange(updatedAnnotations);
};

const onDragMove =(e:any) => {
  const node = e.target;

  const canvasWidth = 950;
  const canvasHeight = 500;
  
  const width = node.width() * node.scaleX();
  const height = node.height() * node.scaleY();

  let newX = Math.max(0, Math.min(node.x(), canvasWidth - width));
  let newY = Math.max(0, Math.min(node.y(), canvasHeight - height));

  node.x(newX);
  node.y(newY);
}

const OnTransformerEnd = (e: any, i:number) => {
  const node = e.target;

  if (!imageData || !imageData.annotations) return;

  const updatedRect: RectangleData = {
    x: node.x(),
    y: node.y(),
    width: node.width() * node.scaleX(),
    height: node.height() * node.scaleY(),
    class_: selectedClass
  };
  node.scaleX(1);
  node.scaleY(1);

  if (i < 0 || i >= imageData.annotations.length) return;

  const updatedAnnotations = [...imageData.annotations];
  updatedAnnotations[i] = updatedRect;

  onAnnotationChange(updatedAnnotations);
};

const boundBBOX = (oldBox: any, newBox: any) => {
  if (newBox.width < 20 || newBox.height < 20) {
    return oldBox;
  }
  return newBox;
};

  return (
    <div className="border border-success border-5 rounded-2">

      <Stage ref={stageRef} width={width} height={height} onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onContextMenu={handleContextMenu} 
        {...({} as any)}>

        {/* Layer for the background image */}
        <Layer>
          {img && (
            <Image image={img} x={0} y={0} width={width} height={height} listening={false} />
          )}
        </Layer>

        {/* Layer for the rectangles and transformer */}
        <Layer>
          {img &&
            imageData?.annotations.map((rect, i) => (
              <Rect key={i} id={`rect${i}`} x={rect.x} y={rect.y} width={rect.width}
                height={rect.height} stroke={colorMap.get(rect.class_)} strokeWidth={2}
                fill="transparent" draggable onClick={() => setSelectedId(i)} onTap={() => setSelectedId(i)}
                onDragEnd={(e:any) => onDragEnd(e,i)} onDragMove={(e:any) => onDragMove(e)} 
                onTransformEnd={(e:any) => OnTransformerEnd(e,i)}/>
            ))}

          {/* Render the new rectangle while drawing */}
          {img && newRectangle && (
            <Rect x={newRectangle.x} y={newRectangle.y} width={newRectangle.width} height={newRectangle.height}
              stroke={colorMap.get(selectedClass)} strokeWidth={2} fill="transparent" />
          )}

          <Transformer ref={trRef} boundBoxFunc={boundBBOX} flipEnabled={false} rotateEnabled={false}/>

        </Layer>
      </Stage>
    </div>
  );
}

export default Canva;
