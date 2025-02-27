import Canva from "./components/Canva";
import FileSelect from "./components/FileSelect";
import DropDownButton from "./components/DropDownButton";
import CustomedTable from "./components/CustomedTable";
import { RectangleData } from "./components/Canva";
import { ImageData } from "./components/Canva";
import DropDownAdd from "./components/DropDownAdd";

import { useState } from "react";


function ObjectDet() {

  const [format, setFormat] = useState("");
  const [model, setModel] = useState("");

  const [filePathList, setFileList] = useState<string[]>([]);
  const [imageDataList, setImageDataList] = useState<ImageData[]>([]);
  const [currentImageData, setCurrentData] = useState<ImageData>();
  const [currentIndex, setCurrentIndex] = useState(0);

  //Input Handling andClass selection
  const[currentInput, setCurrentInput] = useState("");
  const[classes, setClasses] = useState<string[]>([]);
  const[placeholder, setPlaceholder] = useState("Select Class");
  
 
  const onClassAdd = () => {
    setClasses((prevClasses) => [...prevClasses, currentInput]);
    setCurrentInput("");
    // console.log(classes)
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentInput(event.target.value);
  };

  const onChoiceSelect = (choice: string) =>{
    setPlaceholder(choice);
  }

  const onListItemClick = (item: string | RectangleData) => {
    console.log("Clicked index:", item);
    const file = imageDataList.filter((image) => image.path === item)[0];
    const index = file.index
    setCurrentIndex(index || 0);
    setCurrentData(file);
  }

  const handleAnnotationChange = (annotations?: RectangleData[]) => {
    setImageDataList((prevList) => {
      const newList = prevList.map((imgData, index) =>
        index === currentIndex
          ? { ...imgData, annotations: annotations || [] }
          : imgData
      );
      // Also update currentImageData from the new list:
      setCurrentData(newList[currentIndex]);
      return newList;
    });
  };

  const onNextClick = () => {
    const newIndex = (currentIndex + 1) % imageDataList.length;
    setCurrentIndex(newIndex);
    const file = imageDataList.find((image) => image.index === newIndex);
    if (file) {
      setCurrentData(file);
    }
  };
  
  const onPreviousClick = () => {
    const newIndex =
      (currentIndex - 1 + imageDataList.length) % imageDataList.length;
    setCurrentIndex(newIndex);
    const file = imageDataList.find((image) => image.index === newIndex);
    if (file) {
      setCurrentData(file);
    }
  };

  async function openBrowse () {
    const dir = await (window as any).showDirectoryPicker();
    const files = [];
    for await (const entry of dir.values()) {
      if (entry.kind === 'file') { // SEE IF IMAGES CAN BE ENFORCED
        const file = await entry.getFile();
        files.push(file);
      }
    }
    const paths: string[] = files.map(file => file.name);
    setFileList(paths);
    
    const newImages: ImageData[] = files.map((file, index) => ({
      file,
      path: file.name,
      index: index,
      annotations: []
    }));

    setImageDataList(newImages);

    const file = newImages.find((image) => image.index === currentIndex);
      if (file) {
        setCurrentData(file);
      }
  }

  return (
    <>
      {/* TITLE */}
      <h1 className="mb-3 text-center">Object Detection Annotation</h1>
      {/* ANNOTATION ZONE */}
      <div className="d-flex justify-content-between align-items-start">
        {/* LEFT COLUMN */}
        <div className="d-flex flex-column gap-3">
          <button className="btn btn-danger" onClick={openBrowse}>Browse</button>
          <button className="btn btn-danger">Saving Dir</button>
          <DropDownButton input="Format" choices={["XML", "KITTI", "JSON"]} />
          <DropDownButton input="AnnotAI" choices={["Model1", "Model2", "Model3"]} />
          <button className="btn btn-success">Save</button>
          <DropDownAdd defaultChoice = {placeholder} choices={classes} onChoiceAdd={onClassAdd}
              onChoiceSelect={onChoiceSelect} onInputChange={handleInputChange}/> 
        </div>
        {/* MIDDLE COLUMN */}
        <div>
          <Canva width={950} height={500} imageData={currentImageData} onAnnotationChange={handleAnnotationChange}
                  selectedClass={placeholder} />
        </div>
        {/* RIGHT COLUMN */}
        <div className="d-flex flex-column gap-3">
          <CustomedTable headers={["File List"]} listItems={filePathList} onClickFc={onListItemClick}/>
          <CustomedTable headers={["Annotations"]} listItems={currentImageData?.annotations} onClickFc={onClassAdd} />
        </div>
      </div>
      {/* BOTTOM ZONE */}
      <div className="d-flex justify-content-center gap-3 mt-3">
        <button className="btn btn-secondary" onClick={onPreviousClick}>Previous</button>
        <button className="btn btn-secondary" onClick={onNextClick}>Next</button>
      </div>
    </>
  );
}

export default ObjectDet;
