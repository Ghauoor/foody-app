import { ACCESS_TOKEN_SECRET, ACCESS_TOKEN_EXPIRY, REFRESH_TOKEN_SECRET, REFRESH_TOKEN_EXPIRY } from '../../config/config.js';
import { Customer, DeliveryPartner } from '../../models/user.model.js';
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    const accessToken = jwt.sign({
        userId: user._id,
        role: user.role
    },
        ACCESS_TOKEN_SECRET,
        { ACCESS_TOKEN_EXPIRY }
    )
    const refreshToken = jwt.sign({
        userId: user._id,
        role: user.role
    },
        REFRESH_TOKEN_SECRET,
        { REFRESH_TOKEN_EXPIRY }
    )

    return { accessToken, refreshToken }
}


export const loginCustomer = async (req, reply) => {
    try {

        const { phone } = req.body;
        let customer = await Customer.findOne({ phone });

        if (!customer) {
            customer = await Customer.create({
                phone,
                role: 'Customer',
                isActivated: true
            });

            await customer.save();
        }


        const { accessToken, refreshToken } = generateToken(customer);

        return reply.send({
            message: "Login successful",
            accessToken,
            refreshToken,
            customer
        });

    } catch (error) {
        return reply.status(500).send({ message: error.message });
    }
}


export const loginDeliveryPartner = async (req, reply) => {
    try {
        const { email, password } = req.body;
        let deliveryPartner = await DeliveryPartner.findOne({ email });

        if (!deliveryPartner) {
            return reply.status(400).send({ message: "Delivery Partner is not found" });
        }

        const isMatched = password === deliveryPartner.password;

        if (!isMatched) {
            return reply.status(400).send({ message: "Invalid password" });
        }

        const { accessToken, refreshToken } = generateToken(deliveryPartner);

        return reply.send({
            message: "Login successful",
            accessToken,
            refreshToken,
            deliveryPartner
        });


    } catch (error) {
        return reply.status(500).send({ message: error.message });
    }
}



export const refreshToken = async (req, reply) => {
    const { refreshToken } = req.body

    if (!refreshToken) {
        return reply.status(401).send({ message: "Refresh token is required" })
    }
    try {
        const decode = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET);
        let user;

        // todo: handle this with object
        if (decode.role === 'Customer') {
            user = await Customer.findById(decode.userId);
        } else if (decode.role === 'DeliveryPartner') {
            user = await DeliveryPartner.findById(decode.userId);
        } else {
            return reply.status(401).send({ message: "Invalid token" });
        }


        if (!user) {
            return reply.status(401).send({ message: "Invalid token" });
        }

        const { accessToken, refreshToken: newRefreshToken } = generateToken(user);

        return reply.send({
            message: "Token refreshed",
            accessToken,
            refreshToken: newRefreshToken
        });

    } catch (error) {
        return reply.status(500).send({ message: error.message });
    }
}



export const fetchUser = async (req, reply) => {
    try {
        const { userId, role } = req;

        let user;

        if (role === 'Customer') {
            user = await Customer.findById(userId);
        } else if (role === 'DeliveryPartner') {
            user = await DeliveryPartner.findById(userId);
        } else {
            return reply.status(401).send({ message: "Invalid token" });
        }

        if (!user) {
            return reply.status(404).send({ message: "User not found" });
        }

        return reply.send({
            message: "User fetched successfully",
            user
        })

    } catch (error) {
        return reply.status(500).send({ message: error.message });
    }
}
