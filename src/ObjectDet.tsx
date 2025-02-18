import Canva from "./components/Canva";
import FileSelect from "./components/FileSelect";
import DropDownButton from "./components/DropDownButton";
import CustomedTable from "./components/CustomedTable";

import { useState } from "react";

function ObjectDet() {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const filePaths = Array.from(files).map((file) => file.webkitRelativePath);
      setFileList(filePaths);
      console.log(filePaths);
    }
  };

  const [format, setFormat] = useState("");
  const [model, setModel] = useState("");
  const [fileList, setFileList] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  const [annotations, setAnnotations] = useState([]);

  return (
    <>
      {/* TITLE */}
      <h1 className="mb-3 text-center">Object Detection Annotation</h1>
      {/* FOLDER SELECTION */}
      <div className=" mb-3 w-25 mx-auto">
        <FileSelect onChangeFC={handleChange}>Loading Folder</FileSelect>
        <FileSelect onChangeFC={handleChange}>Saving Folder</FileSelect>
      </div>
      {/* ANNOTATION ZONE */}
      <div className="d-flex justify-content-between align-items-start">
        {/* LEFT COLUMN */}
        <div className="d-flex flex-column gap-3">
          <DropDownButton input="Format" choices={["XML", "KITTI", "JSON"]} />
          <DropDownButton input="AnnotAI" choices={["Model1", "Model2", "Model3"]} />
          <button className="btn btn-success">Save</button>
        </div>
        {/* MIDDLE COLUMN */}
        <div>
          <Canva width={950} height={500} />
        </div>
        {/* RIGHT COLUMN */}
        <div className="d-flex flex-column">
          <CustomedTable headers={["File List"]} listItems={["FILE1", "FILE2", "FILE3"]} />
          <CustomedTable headers={["Annotations"]} listItems={["CLASS1", "CLASS2", "CLASS3"]} />
        </div>
      </div>
      {/* BOTTOM ZONE */}
      <div className="d-flex justify-content-center gap-3 mt-3">
        <button className="btn btn-secondary">Previous</button>
        <button className="btn btn-secondary">Next</button>
      </div>
    </>
  );
}

export default ObjectDet;
