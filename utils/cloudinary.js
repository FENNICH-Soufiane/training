

const cloudinary = require("cloudinary").v2;

cloudinary.config({
   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
   api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET
});

// Cloudinary Upload Image
const cloudinaryUploadImage = async (fileToUpload) => {
   try {
      const data = await cloudinary.uploader.upload(fileToUpload, {
         resource_type: "auto",
         folder: 'taining'
      });
      return data;
   } catch (error) {
      return error;
   }
}

const cloudinaryRemoveImage = async (imagePublicId) => {
   try {
      const result = await cloudinary.uploader.destroy;
      return result;
   } catch (error) {
      return error
   }
}

module.exports= {
   cloudinaryUploadImage,
   cloudinaryRemoveImage
}