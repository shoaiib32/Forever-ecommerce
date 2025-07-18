import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productmodel.js";


const addProduct = async (req, res) => {
  try {
    // 1. Read text fields from the form
    const {
      name,
      description,
      price,
      category,
      subCategory,    // Make sure your form field is named exactly this
      sizes,
      bestseller
    } = req.body;

    // 2. Read up to four uploaded files (if they exist)
    //    req.files.image1 is an array of files; we take the first one [0]
    const file1 = req.files.image1 ? req.files.image1[0] : null;
    const file2 = req.files.image2 ? req.files.image2[0] : null;
    const file3 = req.files.image3 ? req.files.image3[0] : null;
    const file4 = req.files.image4 ? req.files.image4[0] : null;

    // 3. Put the files into an array, and remove any nulls
    const files = [file1, file2, file3, file4].filter(f => f);

    // 4. Upload each file to Cloudinary and collect its URL
    const imageUrls = [];
    for (const file of files) {
      // upload returns an object; secure_url is the link to the image
      const uploaded = await cloudinary.uploader.upload(file.path, {
        resource_type: "image"
      });
      imageUrls.push(uploaded.secure_url);
    }

    // 5. Build the data object exactly how the Product model expects it
    const newProduct = {
      name,                                  // string
      description,                           // string
      price: Number(price),                  // convert price to a number
      category,                              // string
      subCategory,                           // string
      bestseller: bestseller === "true",     // convert "true"/"false" to boolean
      sizes: JSON.parse(sizes),              // convert JSON string to array
      image: imageUrls,                      // array of image URLs
      date: Date.now()                       // timestamp
    };

    // 6. Create and save the product document in MongoDB
    const product = new productModel(newProduct);
    await product.save();

    // 7. Send back a success response
    return res.json({ success: true, message: "Product added successfully." });
  }
  catch (error) {
    // If anything goes wrong, log it and send back an error response
    console.error("Error in addProduct:", error);
    return res.json({ success: false, message: error.message });
  }
};

export default addProduct;



//function for list product
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//function for removing product
const removingProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "product Removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//function for single product  info
const singleProduct = async (req, res) => {
  try {
 const { productId } = req.params; 
const product = await productModel.findById(productId)
res.json({success:true,product})
  } catch (error) {
     console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// export const singleProduct = async (req, res) => {
//   try {
//     const { productId } = req.params;        // ← from the URL now
//     const product = await productModel.findById(productId);
//     if (!product) {
//       return res.status(404).json({ success: false, message: 'Not found' });
//     }
//     res.json({ success: true, product });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


export { listProducts, addProduct, removingProduct, singleProduct };
