
const ApiFeatures = require("../../utils/apiFeature");
const productModel = require("../models/productModel");


exports.createOne = (Model) => {
   return async (req, res) => {
      try {
         const newDoc = await Model.create(req.body);
         res.status(201).json({ data: newDoc })
      } catch(error) {
         res.status(500).json({ message: error.message });
      }
   }
}

exports.updateOne = (Model) => {
   return async (req, res) => {
      try {
         const {id} = req.params;
         const document = await Model.findByIdAndUpdate(id, req.body, {new : true, runValidators: true});
         if (!document) {
            return res.status(404).json({message: `No document for this ID ${id}`});
         }
         res.status(200).json({data: document});
      } catch (error) {
         res.status(500).json({message: error.message})
      }
   }
}

exports.getOne = (Model) => {
   return async (req, res) => {
      try {
         const {id} = req.params
         const document = await Model.findById(id);
         if(!document) {
            return res.status(404).json({message: `No document for this ID ${id}`});
         }
         res.status(200).json({data: document});
      } catch (error) {
         res.status(500).json({message: error.message})
      }
   }
}

exports.getAll = (Model, modelName="") => {
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

// exports.getAll = (Model) => {
//    return async (req, res) => {
//        try {
//            let filter = {};

//            if (req.query.filterObj) {
//                filter = JSON.parse(req.query.filterObj);
//                console.log('Parsed Filter:', filter);
//            }

//            // Exécutez la requête MongoDB directement avec le filtre
//            const documents = await Model.find(filter);
//            console.log('Documents:', documents);

//            res.status(200).json({ data: documents });
//        } catch (error) {
//            res.status(500).json({ message: error.message });
//        }
//    }
// }

exports.deleteOne = (Model) => {
   return async (req, res) => {
      try {
         const {id} =  req.params;
         const document = await Model.findByIdAndDelete(id);
         if(!document) {
            return res.status(404).json({message: `No document for this ID ${id}`});
         }
         res.status(200).json({message: "Product deleted successfully"});
      } catch(error) {
         res.status(500).json({message: error.message});
      }
   }
}