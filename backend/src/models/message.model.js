import mongoose, { Schema } from 'mongoose';

const reactionSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { 
    type: String, 
    enum: ['like', 'love', 'haha', 'wow', 'sad', 'angry'],
    required: true
  }
}, { timestamps: true });

const readStatusSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  isRead: { type: Boolean, default: false },
}, { timestamps: true });

const messageSchema = new Schema({
  sender: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  receiver: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  group: { 
    type: Schema.Types.ObjectId, 
    ref: 'Group' 
  },
  conversation: { 
    type: Schema.Types.ObjectId, 
    ref: 'Conversation', 
    required: true 
  },
  content: { 
    type: String, 
    required: true 
  },
  reactions: [reactionSchema],
  media: [{
    type: { 
      type: String, 
      enum: ['image', 'gif', 'emoji', 'audio'],
      required: true 
    },
    media: { 
      type: Schema.Types.ObjectId, 
      ref: 'Media', 
      required: true 
    },
    caption: { 
      type: String, 
      default: '' 
    },
    size: { 
      type: Number, 
      default: 0 
    }
  }],
  readBy: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    isRead: { type: Boolean, default: false }
  }],
  status: { 
    type: String, 
    enum: ['sent', 'delivered', 'seen'],
    default: 'sent'
  },
  isDeleted: { 
    type: Boolean, 
    default: false 
  },
  deletedBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  },
  deletedAt: { 
    type: Date 
  }
}, { timestamps: true });

messageSchema.index({ sender: 1, receiver: 1 });
messageSchema.index({ conversation: 1, createdAt: -1 });
messageSchema.index({ group: 1, createdAt: -1 });
messageSchema.index({ isDeleted: 1 }); 

export const Message = mongoose.model('Message', messageSchema);
