const { mongoose } = require("mongoose");



const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Product Name is required"],
        maxlength: [200, "Too long product name"],
        minlength: [3, "Too short product name"],
        trim: true
    },
    slug: {
        type: String,
        require: true,
        trim: true,
        lowercase: true
    },
    description: {
        type: String,
        required: [true, "Product Description is required"],
        maxlength: [2000, "Too long product description"],
        minlength: [10, "Too short product description"]
    },
    quantity: {
        type: Number,
        required: [true, "Product quantity is required"],
    },
    sold: {
        type: Number,
        default: 0
    },
    price: {
        type: Number,
        required: [true, "Product price is requires"],
        max: [200000, "Too long product price"]
    },
    priceAfterDiscount: {
        type: Number,
    },
    files: [{ type: String }],
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: ["true", "Product must be belong to Category"]
    }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);