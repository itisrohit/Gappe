import mongoose, { Schema } from 'mongoose';

const mediaSchema = new Schema({
    type: { 
        type: String, 
        enum: ['image', 'gif', 'emoji'],  
        required: true 
    },
    url: { 
        type: String, 
        required: true  
    },
    caption: { 
        type: String, 
        default: ''  
    },
    size: { 
        type: Number, 
        required: true  
    },
    metadata: { 
        type: Map, 
        of: Schema.Types.Mixed, 
        default: {}  
    },
    uploadedBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true  
    },
    createdAt: { 
        type: Date, 
        default: Date.now  
    },
    isDeleted: { 
        type: Boolean, 
        default: false  
    },
}, { timestamps: true });

mediaSchema.index({ type: 1 });

export const Media = mongoose.model('Media', mediaSchema);
