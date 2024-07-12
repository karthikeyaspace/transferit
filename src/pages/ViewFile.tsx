import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleDownload } from "../helpers/filehandle";
import Toast from "../utils/Toast";
import { getFileData } from "../utils/db";

const ViewFile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [pass, setPass] = useState<string>("");
  const [reqpass, setReqpass] = useState<boolean>(false);
  const [filefound, setFilefound] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const checkPassReq = async () => {
      setLoading(true);
      const res = await getFileData(id as string);
      setLoading(false);
      if (!res.success) {
        Toast.Error("Error getting file data");
        setFilefound(false);
        return;
      }
      setFilefound(true);
      if (res.data?.hashpass) 
        setReqpass(true);
    };
    checkPassReq();
  }, [id]);

  const handleFileDownload = async () => {
    if (reqpass && pass === "") return Toast.Error("Password required");
    setLoading(true);
    const res = await handleDownload(id as string, pass);
    setLoading(false);
    if (!res.success) Toast.Error(res.message);
    else {
      Toast.Success(res.message);
      const url = window.URL.createObjectURL(res.file!);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = res.filename!;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-8 px-8 md:px-0 text-white">
      {filefound ? (
        <>
          <div className="text-center max-w-2xl mt-20">
            <h1 className="text-4xl font-bold mb-4">Access File</h1>
            <p className="text-gray-300 text-lg">
              Download your secure file. Enter password if required.
            </p>
          </div>
          <div className="w-full max-w-xl">
            {reqpass && (
              <div className="mb-6">
                <input
                  type="password"
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Enter password"
                  className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            )}

            <button
              onClick={handleFileDownload}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              {loading
                ? "Loading..."
                : reqpass
                ? "Submit Password and download"
                : "Download File"}
            </button>
          </div>
          <p className=" text-xs font-thin text-gray-500">
            Files are encrypted. Enter the password if one was set during
            upload.
          </p>
        </>
      ) : (
        <div className="text-center max-w-2xl mt-20">
          <h1 className="text-4xl font-bold mb-4">File Not Found</h1>
          <p className="text-gray-300 text-lg">
            The file you are looking for does not exist or has been deleted.
          </p>
          <a href="/">
            <button className="w-full px-6 py-3 mt-10 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300">
              Get Started
            </button>
          </a>
        </div>
      )}
    </div>
  );
};

export default ViewFile;
