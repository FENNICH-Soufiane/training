const path = require('path');
const { cloudinaryUploadImage } = require('./cloudinary');

// Fonction pour télécharger des images sur Cloudinary
const uploadImagesToCloudinary = async (files) => {
  const fileUrls = [];
  if (files && files.length > 0) {
    const uploadPromises = files.map(async (file) => {
      const imagePath = path.join(__dirname, `../images/${file.filename}`);
      const result = await cloudinaryUploadImage(imagePath);
      return result.secure_url; // Use the Cloudinary URL
    });

    fileUrls.push(...await Promise.all(uploadPromises));
  }
  return fileUrls;
};

module.exports = {
  uploadImagesToCloudinary
};
