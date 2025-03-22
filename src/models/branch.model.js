import mongoose from "mongoose";

const branchSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    location: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        }
    },
    deliveryPartners: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryPartner'
    }],
},
    {
        timestamps: true
    }
);

export const Branch = mongoose.model('Branch', branchSchema, 'Branch');