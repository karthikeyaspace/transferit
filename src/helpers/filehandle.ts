import { uploadToS3, getFileFromS3 } from "../utils/storage";
import { uploadToSupabase, getFileData } from "../utils/db";


const randcode = (len: number) => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHILKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    for (let i = 0; i < len; i++) {
        result += charset[Math.floor(Math.random() * charset.length)];
    }
    return result;
}

const uploadFile = async (file: File, pass: string) => {
    const acceptedfile = {
        types: ["image/png", "image/jpeg", "image/jpg", "image/gif", "text/csv", "application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "application/vnd.ms-excel"],
        size: 5242880 //5MB
    }

    if (!acceptedfile.types.includes(file.type)) {
        return {success: false, message: "File type not accepted"};
    }

    if (file.size > acceptedfile.size) {  
        return {success: false, message: "File size more that 5MB"};
    }

    //upload to aws
    const awsres = await uploadToS3(file);
    if(!awsres.success){
        return {success: false, message: awsres.error};
    }

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


    const supares = await uploadToSupabase(filedata);

    if(!supares.success){
        return {success: false, message: supares.message};
    }

    return {success: true, id: filedata.id};    

}


const handleDownload = async(id: string, pass: string) => {
    const filedata = await getFileData(id);
    if(!filedata)
        return {success: false, message: "Error getting file data"};
    
    if(filedata.data.hashpass){
        if(pass === ""){
            return {success: false, message: "Password required"};
        }
        if(pass !== filedata.data.hashpass){
            return {success: false, message: "Invalid password"};
        }
    }

    //get file from aws
    const file = await getFileFromS3(filedata.data.awskey);

    if(!file)
        return {success: false, message: "Error getting file from S3"};

    //increment download count
    // await incrementDownloadCount(id);

    return { success: true, message: "File retrieved", file, filename: filedata.data.name}
}

export { randcode, uploadFile, handleDownload };