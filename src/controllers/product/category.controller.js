import { Category } from '../../models/category.model.js'

export const getAllCategories = async (req, reply) => {

    try {
        const categories = await Category.find();
        return reply.send(categories);
    } catch (error) {
        return reply.status(500).send({ message: error.message });
    }

}