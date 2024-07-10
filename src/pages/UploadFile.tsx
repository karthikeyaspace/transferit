import React, { useState } from "react";
import { FileType } from "../utils/types";
import { randcode, uploadFile } from "../utils/db";
import Toast from "../utils/Toast";

const UploadFile: React.FC = () => {
  const [file, setFile] = useState<FileType | null>(null);
  // const [error, setError] = useState<string | null>(null);
  const [pass, setPass] = useState<string | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    console.log(file, ": file");
    if (!file) {
      Toast.Error("No file selected.");
      return;
    }
    setFile({
      id: randcode(5),
      name: file.name,
      created_at: new Date().toISOString(),
      filetype: file.type,
      size: file.size,
      downloadcount: 0,
      hashpass: "",
      firebasekey: "firekey",
    });
  };

  const createFile = async () => {
    if (!file) {
      Toast.Error("No file selected");
      return;
    }
    const upload = await uploadFile(file);
    if (upload.message === "success") {
      Toast.Success("File uploaded successfully.");
      console.log("File created successfully.");
    } else {
      Toast.Error(upload.error || "Error creating file.");
      console.error("Error creating file:", upload.error);
    }
  };

  const handlepass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
    if (file) {
      setFile({ ...file, hashpass: event.target.value });
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-center gap-8 bg-gray-900 text-white p-8">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-4">Secure Anonymous File Share</h1>
        <p className="text-gray-300 text-lg">
          Upload and share files securely with end-to-end encryption. No
          registration required.
        </p>
      </div>
      <div className="w-full max-w-xl">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-800 hover:bg-gray-700 transition-colors duration-300"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-10 h-10 mb-3 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              ></path>
            </svg>
            <p className="mb-2 text-sm text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">
              Supported formats: PNG, JPG, GIF, PDF (Max 5MB)
            </p>
            {file && <p className="mt-2 text-sm text-blue-400">{file.name}</p>}
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleChange}
          />
        </label>
      </div>
      <div className="w-full max-w-lg">
        <div className="flex items-center gap-4">
          <input
            type="password"
            onChange={handlepass}
            placeholder="Set a password (optional)"
            className="flex-grow px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={createFile}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Upload
          </button>
        </div>
        <p className="mt-1 text-xs font-thin text-gray-500">
          Files are encrypted. Use a password for added security.
        </p>
      </div>
    </div>
  );
};

export default UploadFile;
