import "./App.css";
import Navbar from "./components/Navbar";
import Canva from "./components/Canva";
import ObjectDet from "./ObjectDet";

function App() {
  let navig_links = [
    "Object Detection Annotation",
    "Siamese Network Annotation",
    "OCR Annotation",
    "Classification Annotation",
    "AI Pipeline",
    "Format Translation",
    "Crop",
    "Frame Extraction",
  ];

  return (
    // <div>
    //   <h1>IntelliTools</h1>
    //   <Navbar nav_links={navig_links} />
    // </div>

    <>
      <ObjectDet />
    </>
  );
}

export default App;
