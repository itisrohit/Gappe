import mongoose, { Schema } from 'mongoose';

const participantSchema = new Schema({
  user: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['admin', 'member'], 
    default: 'member' 
  },
  lastSeen: { 
    type: Date, 
    default: Date.now 
  },
  isDeleted: { 
    type: Boolean, 
    default: false 
  },
  deletedAt: { 
    type: Date 
  }
}, {timestamps: true});

const conversationSchema = new Schema({
  type: { 
    type: String, 
    enum: ['private', 'group'], 
    required: true 
  },
  name: { 
    type: String, 
    required: function() { return this.type === 'group'; },
    default: ''
  },
  participants: [participantSchema],
  lastMessage: { 
    type: Schema.Types.ObjectId, 
    ref: 'Message' 
  },
  isDeleted: { 
    type: Boolean, 
    default: false 
  },
  unreadMessageCount: { 
    type: Number, 
    default: 0 
  },
  createdBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  isMuted: { 
    type: Boolean, 
    default: false 
  }
}, {timestamps: true});

// Index improvements
conversationSchema.index({ type: 1, 'participants.user': 1 });
conversationSchema.index({ lastMessage: 1 });
conversationSchema.index({ unreadMessageCount: 1 });
conversationSchema.index({ createdBy: 1 });

export const Conversation = mongoose.model('Conversation', conversationSchema);
