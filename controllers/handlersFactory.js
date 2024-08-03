
const ApiFeatures = require("../utils/apiFeature");
const { cloudinaryUploadImage } = require("../utils/cloudinary");
const upload = require("../utils/upalod")
const path = require('path');
const { uploadImagesToCloudinary } = require("../utils/uploadImagesToCloudinary");



exports.createOne = (Model) => {
   return async (req, res) => {
      try {
         
       
         let fileUrls = await uploadImagesToCloudinary(req.files);
         
         // Création du produit avec l'URL de l'image si présente
         const newProduct = {
            ...req.body,
            files: fileUrls.length ? fileUrls : undefined // Only include images field if there are uploaded images
         };
         const newDoc = await Model.create(newProduct);
         res.status(201).json({ data: newDoc })
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   }
}

exports.updateOne = (Model) => {
   return async (req, res) => {
      try {
         const { id } = req.params;
         const document = await Model.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
         if (!document) {
            return res.status(404).json({ message: `No document for this ID ${id}` });
         }
         res.status(200).json({ data: document });
      } catch (error) {
         res.status(500).json({ message: error.message })
      }
   }
}




exports.getOne = (Model) => {
   return async (req, res) => {
      try {
         const { id } = req.params
         const document = await Model.findById(id);
         if (!document) {
            return res.status(404).json({ message: `No document for this ID ${id}` });
         }
         res.status(200).json({ data: document });
      } catch (error) {
         res.status(500).json({ message: error.message })
      }
   }
}

exports.getAll = (Model, modelName = "") => {
   return async (req, res) => {
      try {
         let filter = {};

         // Vérifiez si filterObj est présent dans les paramètres de requête et analysez-le
         if (req.query.filterObj) {
            filter = JSON.parse(req.query.filterObj);
            console.log('Parsed Filter:', filter);
         }

         const documentsCounts = await Model.countDocuments();
         // Créez une instance de ApiFeatures pour appliquer les filtres
         const apiFeatures = new ApiFeatures(Model.find(filter), req.query)
            .filter()
            .sort()
            .limitFields()
            .search(Model, modelName)
            .paginate(documentsCounts);

         const { mongooseQuery, paginationResult } = apiFeatures;

         // Exécutez la requête MongoDB
         const documents = await mongooseQuery;
         console.log('Documents:', documents);

         // Répondez avec les documents trouvés
         res.status(200).json({ results: documents.length, paginationResult, data: documents });
      } catch (error) {
         // Capture et répondez aux erreurs
         res.status(500).json({ message: error.message });
      }
   }
}

exports.deleteOne = (Model) => {
   return async (req, res) => {
      try {
         const { id } = req.params;
         const document = await Model.findByIdAndDelete(id);
         if (!document) {
            return res.status(404).json({ message: `No document for this ID ${id}` });
         }
         res.status(200).json({ message: "Product deleted successfully" });
      } catch (error) {
         res.status(500).json({ message: error.message });
      }
   }
}