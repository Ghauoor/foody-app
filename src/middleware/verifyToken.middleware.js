import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/config.js";

export const verifyToken = async (req, reply) => {
    try {
        const authHeader = req.headers['authorization'];

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return reply.status(401).send({ message: 'Access Token is Required' });
        }

        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);

        req.user = decoded;

        return true


    } catch (error) {
        return reply.status(500).send({ message: 'Internal server error', error: error.message });
    }
}