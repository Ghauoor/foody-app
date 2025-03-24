import { authRoutes } from './auth.route.js';
import { orderRoutes } from './order.route.js'
import { productRoutes, categoryRoutes } from './product.route.js';


const prefix = '/api/v1';

export const registerRoutes = async (fastify) => {

    fastify.register(authRoutes, { prefix });
    fastify.register(categoryRoutes, { prefix });
    fastify.register(productRoutes, { prefix });
    fastify.register(orderRoutes, { prefix });
}
