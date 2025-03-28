import mongoose from "mongoose";
import { Counter } from "./counter.model.js";

const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        unqiue: true
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: true
    },
    deliveryPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DeliveryPartner',
    },
    branch: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true
    },
    items: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        count: {
            type: Number,
            required: true
        }
    }],

    deliveryLocation: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
        address: {
            type: String,
            required: true
        }
    },
    pickupLocation: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
        address: {
            type: String,
            required: true
        }
    },
    deliveryPersonLocation: {
        latitude: {
            type: Number,
        },
        longitude: {
            type: Number,
        },
        address: {
            type: String,
        }
    },

    status: {
        type: String,
        enum: ['available', 'confirmed', 'arriving', 'delivered', 'cancelled'],
        default: 'available'
    },
    totalPrice: {
        type: Number,
        required: true
    },

},
    {
        timestamps: true
    }
)

async function genNextSequenceValue(sequenceName) {
    const sequenceDocument = await Counter.findOneAndUpdate(
        { _id: sequenceName },
        { $inc: { sequence_value: 1 } },
        { new: true, upsert: true }
    )
    return sequenceDocument?.sequence_value;
}

orderSchema.pre('save', async function (next) {
    if (this.isNew) {
        const sequenceValue = await genNextSequenceValue('orderId');
        this.orderId = `ORDR-${sequenceValue.toString().padStart(5, '0')}`;
    }
    next();
})


export const Order = mongoose.model('Order', orderSchema, 'Order');