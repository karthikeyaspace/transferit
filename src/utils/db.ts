import { supabase } from "../services/supabase";
import { FileType } from "./types";

const randcode = (len: number) => {
    const charset = "abcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < len; i++) {
        result += charset[Math.floor(Math.random() * charset.length)];
    }
    return result;
}


const uploadFile = async (file: FileType) => {
    const acceptedfile = {
        types: ["image/png", "image/jpeg", "image/gif", "application/pdf"],
        size: 5242880
    }

    if (!acceptedfile.types.includes(file.filetype)) {
        return {message: "error", error: "File type not accepted"};
    }

    if (file.size > acceptedfile.size) {  
        return {message: "error", error: "File size more that 5MB"};
    }

    //first upload file to firebase
    
    //then update to supabase
    const { data, error } = await supabase
        .from('files')
        .insert([{ 
            id: file.id,
            name: file.name, 
            size: file.size, 
            filetype: file.filetype, 
            downloadcount: file.downloadcount, 
            hashpass: file.hashpass, 
            firebasekey: file.firebasekey 
        }]);
    if (error) {
        console.error('Error creating file:', error.message);
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



export { randcode, uploadFile };