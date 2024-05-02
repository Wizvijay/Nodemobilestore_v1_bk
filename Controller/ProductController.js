const Product=require("../Model/ProductModel")
const{body,sanitizeBody,validationResult} =require("express-validator")
const multer = require('multer');
const path = require('path');




// Multer configuration for file upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/data/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const uploader = multer({ storage: storage });

exports.insertProduct = [
    uploader.single('uploaded_file'), // Multer middleware for single file upload
    body("name").isLength({ min: 1 }).withMessage("Name cannot be empty"),
    body("name").isAlpha().withMessage("Name cannot contain numbers or special characters"),
    body("description").isLength({ min: 10 }).withMessage("Description must be at least 10 characters long"),
    body("price").isNumeric().withMessage("Price must be numeric"),
    
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const product = new Product({
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.file ? req.file.filename : null,
                categoryname: req.body.categoryname,
                brandname: req.body.brandname,
            });

            // Save the product to the database
            const savedProduct = await product.save();
            
            // Respond with success message and saved product data
            return res.status(200).json(savedProduct);
        } catch (err) {
            // Handle error and send appropriate response
            return res.status(500).json({ error: err.message });
        }
    }
];
exports.list=[(req,res)=>{
    Product.find()
    .then((products)=>{
        return res.status(200).send(products)
    })
    .catch((err)=>{
        return res.status(200).send(err.message)
    })
}]
exports.update= [
    uploader.single('uploaded_file'), // Multer middleware for single file upload
    body("name").isLength({ min: 1 }).withMessage("Name cannot be empty"),
    body("name").isAlpha().withMessage("Name cannot contain numbers or special characters"),
    body("description").isLength({ min: 10 }).withMessage("Description must be at least 10 characters long"),
    body("price").isNumeric().withMessage("Price must be numeric"),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            // Prepare update data
            const updates = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                categoryname: req.body.categoryname,
                brandname: req.body.brandname,
            };

            // If there's a file uploaded, update the image
            if (req.file) {
                updates.image = req.file.filename;
            }

            // Update the product by ID
            const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updates, { new: true });

            if (!updatedProduct) {
                return res.status(404).json({ error: 'Product not found' });
            }

            return res.status(200).json(updatedProduct);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
];
exports.delete=(req,res)=>{
    const productId=req.params.id;
    Product.findByIdAndDelete(productId)
    .then((deletedProduct)=>{
        // return res.status(200).send(deletedProduct)
        return res.status(200).send("product deleted sucessfully")


    })
    .catch((err)=>{
        return res.status(200).send(err.message)
    })

}
