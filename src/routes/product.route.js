import { getAllCategories } from '../controllers/product/category.controller.js';
import { getProductsByCategoryId } from '../controllers/product/product.controller.js';

export const categoryRoutes = async (fastify, option) => {
    fastify.get('/categories', getAllCategories);
}

export const productRoutes = async (fastify, option) => {
    fastify.get('/products/:categoryId', getProductsByCategoryId);
}