import { uploadToS3 } from "../utils/storage";
import { uploadToSupabase } from "../utils/db";

const randcode = (len: number) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHILKLMNOPQRSTUVWXYZ";
    let result = "";
    for (let i = 0; i < len; i++) {
        result += charset[Math.floor(Math.random() * charset.length)];
    }
    return result;
}

const uploadFile = async (file: File, pass: string) => {
    const acceptedfile = {
        types: ["image/png", "image/jpeg", "image/jpg", "text/csv", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel"],
        size: 5242880
    }

    if (!acceptedfile.types.includes(file.type)) {
        return {message: "error", error: "File type not accepted"};
    }

    if (file.size > acceptedfile.size) {  
        return {message: "error", error: "File size more that 5MB"};
    }

    //upload to aws
    const awsres = await uploadToS3(file);
    if(awsres.message === "error"){
        return {message: "error", error: awsres.error};
    }

    //success block
    console.log('file uploaded to aws')

    //upload to supabase
    const filedata = {
        id: randcode(10), //id gived to client to file access
        name: file.name,
        created_at: new Date().toISOString(),
        filetype: file.type,
        size: file.size,
        downloadcount: 0,
        hashpass: pass,
        awskey: awsres.data?.key || ""
    }

    console.log(filedata, "filedataa")
    const supares = await uploadToSupabase(filedata);

    if(supares.message === "error"){
        return {message: "error", error: supares.error};
    }

    return {message: "success", data: {filedata, awsres, supares}, id: filedata.id};    

}


export { randcode, uploadFile };