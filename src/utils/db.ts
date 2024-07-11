import { supabase } from "../services/supabase";
import { FileType } from "./types";

const uploadToSupabase = async (file: FileType) => {
  const { data, error } = await supabase.from("files").insert([
    {
      id: file.id,
      name: file.name,
      size: file.size,
      filetype: file.filetype,
      downloadcount: 0,
      hashpass: file.hashpass,
      awskey: file.awskey,
    },
  ]);
  if (error) {
    console.error("Error creating file - SUPABASE:", error.message);
    return { success: false, message: "Error creating file" };
  } else {
    return { success: true, data: data };
  }
};

const getFileData = async (id: string) => {
  const response = await supabase
    .from("files")
    .select("*")
    .eq("id", id)
    .single();

  if (response.error) {
    console.error("Error getting file data:", response.error.message);
    return { success: false, message: "Error getting file data" };
  }

  return {success: true, data: response.data };
};

const incrementDownloadCount = async (id: string) => {
  const response = await supabase
    .from("files")
    .update({ downloadcount: supabase.rpc("increment") })
    .eq("id", id);

  if(response.error){
    console.error("Error incrementing download count:", response.error.message);
    return { success: false, message: "Error incrementing download" };
  }  

  return { success: true };
};

// const deleteFile = async (id: number) => {
//     const { error } = await supabase.from("files").delete().eq("id", id);
//     if (error) {
//         console.error("Error deleting file:", error.message);
//         return {message: "error", error: error.message};
//     } else {
//         return {message: "success", id};
//     }
// }

export { uploadToSupabase, getFileData, incrementDownloadCount };
