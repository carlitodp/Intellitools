import { Stage, Layer, Rect, Text } from "react-konva";

interface Props {
  width: number;
  height: number;
}

function Canva({ width, height }: Props) {
  return (
    <>
      <div className="border border-success border-5 rounded-2">
        <Stage width={width} height={height}></Stage>
      </div>
    </>
  );
}

export default Canva;
