import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    clerkId: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    role: {
        type: String,
        enum: ['buyer', 'seller', 'admin'],
        default: 'buyer',
    },
    // Only for sellers
    sellerDetails: {
        storeName: {
            type: String,
            maxlength: [20, 'Store name cannot exceed 20 characters'],
            minlength: [3, 'Store name must be at least 3 characters'],
        },
        storeDescription: String,
        bankDetails: {
            accountHolder: String,
            accountNumber: {
                type: String,
            },
            ifscCode: {
                type: String,
            },
        },
        isApproved: {
            type: Boolean,
            default: false,
        },
    },
}, { timestamps: true });

const User = model('User', userSchema);
export default User;
