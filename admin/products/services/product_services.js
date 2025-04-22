const Product = require('../models/product_model');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

// Cloudinary config (replace with your own credentials)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadImagesToCloudinary(files) {
  const uploadPromises = files.map((file) => cloudinary.uploader.upload(file.path, { folder: 'products' }));
  const results = await Promise.all(uploadPromises);

  // Delete local files after upload
  files.forEach((file) => {
    fs.unlink(file.path, (err) => {
      if (err) console.error('Error deleting file:', file.path, err);
    });
  });

  return results;
}

module.exports = {
  createProductService: async ({ body, files }) => {
    const {
      name,
      category,
      price,
      title,
      description,
      details,
      featuredProduct,
      newProduct,
      inStock,
    } = body;
    // Assume details is already an array from frontend
    const detailsArray = details;

    // Upload images to Cloudinary
    let imageUrls = [];
    if (files && files.length > 0) {
      const uploadResults = await uploadImagesToCloudinary(files);
      imageUrls = uploadResults.map((result) => ({
        url: result.secure_url,
        public_id: result.public_id,
      }));
    }

    const product = new Product({
      name,
      category,
      price,
      title,
      description,
      images: imageUrls,
      details: detailsArray,
      featuredProduct,
      newProduct,
      inStock,
    });
    await product.save();
    return 'Product Added Successfully';
  },

  getAllProductsService: async () => {
    return Product.find();
  },

  getProductByIdService: async (id) => {
    return Product.findById(id);
  },

  updateProductService: async (id, { body, files }) => {
    // 1. Find the existing product
    const product = await Product.findById(id);
    if (!product) throw new Error('Product not found');
    // 2. Remove selected images (from remove_img)
    let removeImages = [];
    if (body.remove_img) {
      if (typeof body.remove_img === 'string') {
        try {
          removeImages = JSON.parse(body.remove_img);
        } catch (e) {
          removeImages = [body.remove_img];
        }
      } else if (Array.isArray(body.remove_img)) {
        removeImages = body.remove_img;
      } else if (body.remove_img.url && body.remove_img.public_id) {
        removeImages = [body.remove_img];
      }
      // Delete from Cloudinary and remove from product.images
      for (const img of removeImages) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
      product.images = product.images.filter(
        img => !removeImages.some(rm => rm.public_id === img.public_id)
      );
    }
  
    // 3. Upload new images (if any)
    let newImages = [];
    if (files && files.length > 0) {
      const uploadResults = await uploadImagesToCloudinary(files);
      newImages = uploadResults.map(result => ({
        url: result.secure_url,
        public_id: result.public_id,
      }));
      product.images.push(...newImages);
    }
  
    // 4. Update other fields (excluding remove_img)
    const updatableFields = { ...body };
    delete updatableFields.remove_img;
    Object.assign(product, updatableFields);
  
    // 5. Ensure details is array
    if (product.details && typeof product.details === 'string') {
      product.details = [product.details];
    }
  
    // 6. Save and return updated product
    await product.save();
    return product;
  },

  deleteProductService: async (id) => {
    const product = await Product.findById(id);
    if (!product) throw new Error('Product not found');
    // Delete images from Cloudinary
    if (product.images && product.images.length > 0) {
      for (const img of product.images) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
    }
    await Product.findByIdAndDelete(id);
    return 'Product deleted successfully';
  },
};
