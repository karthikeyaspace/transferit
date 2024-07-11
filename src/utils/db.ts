import { supabase } from "../services/supabase";
import { FileType } from "./types";


const uploadToSupabase = async (file: FileType) => {
    const { data, error } = await supabase
        .from('files')
        .insert([{ 
            id: file.id,
            name: file.name, 
            size: file.size, 
            filetype: file.filetype, 
            downloadcount: 0, 
            hashpass: file.hashpass, 
            awskey: file.awskey 
        }]);
    if (error) {
        console.error('Error creating file - SUPABASE:', error.message);
        return {message: "error", error: error.message};
    } else {
        return {message: "success", data: data};
    }
}

// const deleteFile = async (id: number) => {
//     const { error } = await supabase.from("files").delete().eq("id", id);
//     if (error) {
//         console.error("Error deleting file:", error.message);
//         return {message: "error", error: error.message};
//     } else {
//         return {message: "success", id};
//     }
// }



export { uploadToSupabase };