import mongoose, { Schema } from 'mongoose';

const friendSchema = new Schema({
  requester: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  recipient: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'declined', 'blocked'], 
    default: 'pending' 
  },
  blockedBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    default: null 
  },
  mutualFriendship: { 
    type: Boolean, 
    default: false 
  },
  acceptedAt: { 
    type: Date 
  },
  declinedAt: { 
    type: Date 
  }
}, { timestamps: true });

friendSchema.index({ requester: 1, recipient: 1 }, { unique: true });
friendSchema.index({ recipient: 1, requester: 1 }, { unique: true });

// Virtual to get mutual friendship status
friendSchema.virtual('isMutual').get(function() {
  return this.status === 'accepted' && this.mutualFriendship;
});

// Validation to prevent the same user being both requester and recipient
friendSchema.pre('save', function(next) {
  if (this.requester.equals(this.recipient)) {
    return next(new Error('Requester and recipient cannot be the same user.'));
  }
  next();
});

export const Friend = mongoose.model('Friend', friendSchema);
