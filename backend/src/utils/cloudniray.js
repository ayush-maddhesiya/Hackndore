// import exp from "constants";
import {v2 as cloudinary} from "cloudinary";
import fs from "fs"

          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUND_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath)=>{
    try {
        if(!localFilePath) return null;
        //upload on cloundniary
        const respone = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        })
        //file is successfully uploaded
        // console.log("file is successfully uploaded : ",respone.url);
        fs.unlinkSync(localFilePath)
        return respone;
    } catch (error) {
        fs.unlinkSync(localFilePath) //this remove file is 
        return null;
    }
}

cloudinary.uploader.upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
  { public_id: "olympic_flag" }, 
  function(error, result) {
    
   });


export {uploadOnCloudinary}