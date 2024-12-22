import mongoose, { Schema } from 'mongoose';

const streamChatMessageSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  message: { 
    type: String, 
    required: true 
  },
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });

export const StreamChatMessage = mongoose.model('StreamChatMessage', streamChatMessageSchema);
