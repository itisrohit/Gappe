import mongoose, { Schema } from 'mongoose';

const notificationSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  type: { 
    type: String, 
    enum: [
      'unreadMessage', 
      'friendRequest', 
      'call', 
      'mention', 
      'groupUpdate',
      'streamControl', 
      'system'
    ], 
    required: true 
  },
  message: { 
    type: Schema.Types.ObjectId, 
    ref: 'Message' 
  },
  sender: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  group: { 
    type: Schema.Types.ObjectId, 
    ref: 'Group' 
  },
  conversation: { 
    type: Schema.Types.ObjectId, 
    ref: 'Conversation' 
  },
  content: { 
    type: String, 
    default: '' 
  },
  isRead: { 
    type: Boolean, 
    default: false 
  },
  isDeleted: { 
    type: Boolean, 
    default: false 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
}, { timestamps: true });


notificationSchema.index({ user: 1, isRead: 1 });
notificationSchema.index({ user: 1, createdAt: -1 });


notificationSchema.index({ type: 1, sender: 1 });
notificationSchema.index({ type: 1, group: 1 });

export const Notification = mongoose.model('Notification', notificationSchema);
