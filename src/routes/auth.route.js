import { fetchUser, loginCustomer, loginDeliveryPartner, refreshToken } from '../controllers/auth/auth.controller.js';
import { updateUser } from '../controllers/tracking/user.controller.js'
import { verifyToken } from '../middleware/verifyToken.middleware.js';


export const authRoutes = async (fastify, options) => {
    fastify.post('/customer/login', loginCustomer);
    fastify.post('/delivery/login', loginDeliveryPartner);
    fastify.post('/refresh-token', refreshToken);
    fastify.post('/user', { preHandler: [verifyToken] }, fetchUser);
    fastify.patch('/user', { preHandler: [verifyToken] }, updateUser);
}