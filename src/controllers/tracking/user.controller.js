import { Customer, DeliveryPartner } from "../../models/index.js";

export const updateUser = async (req, reply) => {
    try {
        const { userId } = req.params;
        const updateData = req.body;
        let user = await Customer.findById(userId) || await DeliveryPartner.findById(userId);

        if (!user) {
            return reply.status(404).send({ message: "User not found" });
        }

        let UserModel;

        if (user.role === 'Customer') {
            UserModel = Customer;
        } else if (user.role === 'DeliveryPartner') {
            UserModel = DeliveryPartner;
        } else {
            return reply.status(400).send({ message: "Invalid user" });
        }

        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            updateData,
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return reply.status(400).send({ message: "User not updated" });
        }

        return reply.send({
            message: "User updated successfully",
            user: updatedUser
        });



    } catch (error) {
        return reply.status(500).send({ message: error.message });
    }
}