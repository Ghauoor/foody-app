import mongoose from "mongoose";

// Base user
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Customer', 'Admin', 'DeliveryPartner'],
        required: true,
    },
    isActivated: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true
    }
);

// Customer Schema

const customerSchema = new mongoose.Schema({
    ...userSchema.obj,
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'Customer',
        enum: ['Customer'],
    },
    liveLocation: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        }
    },
    address: {
        type: String,
        required: true
    }
});


const deliveryPartnerSchema = new mongoose.Schema({
    ...userSchema.obj,
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'DeliveryPartner',
        enum: ['DeliveryPartner']
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    liveLocation: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        }
    },
    address: {
        type: String,
        required: true
    },

    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
    }
})


// Admin Schema
const adminSchema = new mongoose.Schema({
    ...userSchema.obj,
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        default: 'Admin',
        enum: ['Admin']
    },
    password: {
        type: String,
        required: true
    }
})

export const Customer = mongoose.model('Customer', customerSchema, 'Customer');
export const DeliveryPartner = mongoose.model('DeliveryPartner', deliveryPartnerSchema, 'DeliveryPartner');
export const Admin = mongoose.model('Admin', adminSchema, 'Admin');