import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

import { IoMdAddCircle } from "react-icons/io";

interface DropzoneProps {
  onFileSelected: (file: File | null) => void;
}

const Dropzone: React.FC<DropzoneProps> = ({ onFileSelected }) => {
  const [file, setFile] = useState<File | null>(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      onFileSelected(acceptedFiles[0]);
    },
    onFileDialogCancel: () => onFileSelected(null),
  });

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-8">
        <div
          {...getRootProps()}
          className="flex items-center justify-center bg-slate p-4 rounded-lg cursor-pointer"
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the file here...</p>
          ) : (
            <p className="flex items-center gap-2">
              {" "}
              <IoMdAddCircle className="w-5 h-5" />
              Choose file
            </p>
          )}
        </div>
      </div>

      <div className="col-span-4 flex items-center text-xs">
        {" "}
        {file && file ? <p>{file.name}</p> : "No file chosen"}
      </div>
    </div>
  );
};

export default Dropzone;
