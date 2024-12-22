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

const streamSchema = new Schema({
  host: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  group: { 
    type: Schema.Types.ObjectId, 
    ref: 'Group' 
  },
  mediaSource: { 
    type: String, 
    required: true 
  },
  streamType: { 
    type: String, 
    enum: ['audio', 'video'], 
    required: true 
  },
  controls: {
    playPause: { 
      type: Boolean, 
      default: false 
    },
    volume: { 
      type: Number, 
      default: 100 
    },
    isMuted: { 
      type: Boolean, 
      default: false 
    }
  },
  soundControls: {
    mediaVolume: { 
      type: Number, 
      default: 100 
    },
    callVolume: { 
      type: Number, 
      default: 100 
    },
    mediaMuted: { 
      type: Boolean, 
      default: false 
    },
    callMuted: { 
      type: Boolean, 
      default: false 
    }
  },
  delegatedAuthorities: [{
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    permissions: {
      canPause: { 
        type: Boolean, 
        default: false 
      },
      canMute: { 
        type: Boolean, 
        default: false 
      }
    }
  }],
  participants: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'User' 
  }],
  temporaryChat: [{
    type: Schema.Types.ObjectId, 
    ref: 'StreamChatMessage'
  }],
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  endedAt: { 
    type: Date 
  },
  status: { 
    type: String, 
    enum: ['active', 'paused', 'ended', 'buffering', 'error', 'waiting'], 
    default: 'active' 
  },
  isDeleted: { 
    type: Boolean, 
    default: false 
  },
  viewCount: { 
    type: Number, 
    default: 0 
  }
}, { timestamps: true });

streamSchema.index({ host: 1 });
streamSchema.index({ group: 1 });
streamSchema.index({ status: 1 });
streamSchema.index({ participants: 1 });

export const Stream = mongoose.model('Stream', streamSchema);
export const StreamChatMessage = mongoose.model('StreamChatMessage', streamChatMessageSchema);
