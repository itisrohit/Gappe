import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,
        match: [/\S+@\S+\.\S+/, 'Please use a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    fullname: {
        type: String,
        required: true,
        trim: true,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"],
        required: true
    },
    profilePicture: {
        type: String,
        default: ''
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    }],
    friendRequests: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        index: true
    }],
    notifications: [{
        type: Schema.Types.ObjectId,
        ref: 'Notification',
        index: true
    }],
    refreshToken: {
        type: String,
        default: ''
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    verified: { 
        type: Boolean,
        default: false
    },
    twoFactorEnabled: {
        type: Boolean,
        default: false
    },
    otp: {
        type: String
    },
    otpExpiry: {
        type: Date,
        index: true
    },
}, {
    timestamps: true
});

userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    if (this.isModified('otp')) {
        this.otp = bcrypt.hash(this.otp, 10);
    }
    next();
});

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.isOtpCorrect = async function(otp) {
    return await bcrypt.compare(otp, this.otp);
};

userSchema.methods.generateAccessToken = function() {
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.fullname,
    }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: process.env.ACCESS_TOKEN_EXPIRY });
};

userSchema.methods.generateRefreshToken = function() {
    return jwt.sign({
        _id: this._id,
    }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXPIRY });
};

export const User = mongoose.model('User', userSchema);
