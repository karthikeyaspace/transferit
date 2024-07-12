import React, { useState } from "react";
import { uploadFile } from "../helpers/filehandle";
import Toast from "../utils/Toast";

const UploadFile: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [pass, setPass] = useState<string>("");
  const [id, setId] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  //when user selects a file
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      Toast.Error("No file selected.");
      return;
    }
    setFile(file);
  };

  //when user clicks on upload button
  const createFile = async () => {
    if (!file) {
      Toast.Error("No file selected");
      return;
    }
    setLoading(true);
    const upload = await uploadFile(file, pass);
    setLoading(false);
    if (upload.success) {
      Toast.Success("File uploaded successfully.");
      setId(upload.id)
      setFile(null);
      (
        document.getElementsByClassName("passfield")[0] as HTMLInputElement
      ).value = "";
    } 

    else {
      Toast.Error("Error uploading file.");
      console.error("Error uploading file:", upload.message);
    }
  };

  //when user types in password
  const handlepass = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPass(event.target.value);
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-8 px-8 md:px-0 text-gray-300 ">
      <div className="text-center max-w-2xl mt-20">
        <h1 className="text-4xl font-bold mb-4 ">
          Secure Anonymous File Share
        </h1>
        <p className="text-gray-300 text-lg">
          Upload and share files securely and anonymously with end-to-end encryption. No
          registration required.
        </p>
      </div>
      <div className="w-full max-w-xl">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 px-10 border-gray-600 border-dashed rounded-lg cursor-pointer bg-stone-800 hover:bg-stone-700 transition-colors duration-300"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-10 h-10 mb-3 text-gray-300"
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
              Supported formats: PNG, JPG, GIF, PDF, WORD, EXCEL (Max 5MB)
            </p>
            {file && <p className="mt-2 text-sm text-white">{file.name}</p>}
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={handleChange}
          />
        </label>
      </div>
      <div className={`w-full max-w-lg ${!id && "mb-10"}`}>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
          <input
            type="password"
            onChange={handlepass}
            placeholder="Set a password (optional)"
            className="passfield w-full px-4 py-2 rounded-lg bg-transparent border border-gray-500 focus:outline-none focus:ring-2 focus:ring-stone-400"
          />
          <button
            onClick={createFile}
            className="w-full sm:w-40 px-6 py-2 bg-stone-600 text-white rounded-lg hover:bg-stone-500 transition-colors duration-300"
            disabled={loading}
          >
            {loading ? "Loading...": "Upload"}
          </button>
        </div>
        <p className="mt-2 text-xs font-thin text-gray-500">
          Files are encrypted. Use a password for added security.
        </p>
      </div>

      {id && (
        <div className=" w-full max-w-xl relative bg-stone-900 border overflow-x-hidden border-gray-700 rounded-lg p-4 mb-10 text-center">
          <p className="text-sm text-gray-400 mb-2">Your secure file link:</p>
          <p
            className="absolute top-0 right-2 text-gray-600 hover:cursor-pointer"
            onClick={() => setId("")}
          >
            x
          </p>
          <div className="flex items-center justify-center gap-2">
            <input
              type="text"
              value={`https://transferfile.vercel.app/${id}`}
              readOnly
              className="bg-stone-800 text-gray-300 px-3 py-2 rounded-lg flex-grow overflow-x-scroll"
            />
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `https://transferfile.vercel.app/${id}`
                );
                Toast.Success("Link copied to cllipboard");
              }}
              className="bg-stone-600 hover:bg-stone-500 text-white px-4 py-2 rounded-lg transition-colors duration-300"
            >
              Copy
            </button>
          </div>
          <p className="mt-2 text-xs text-gray-500">
            Share this link to allow others to download your file
          </p>
        </div>
      )}
    </div>
  );
};

export default UploadFile;
