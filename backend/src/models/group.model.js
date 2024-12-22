import mongoose, { Schema } from 'mongoose';

const groupParticipantSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    role: { 
        type: String, 
        enum: ['admin', 'member', 'moderator', 'host'], 
        default: 'member' 
    },
    isMuted: { 
        type: Boolean, 
        default: false 
    },
    isBanned: { 
        type: Boolean, 
        default: false 
    },
    lastSeen: { 
        type: Date, 
        default: Date.now 
    },
    lastActiveAt: { 
        type: Date 
    },
    lastSeenMessage: { 
        type: Schema.Types.ObjectId, 
        ref: 'Message', 
    }
}, { timestamps: true });

const groupSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    description: { 
        type: String, 
        default: '' 
    },
    type: { 
        type: String, 
        enum: ['public', 'private'], 
        default: 'private' 
    },
    createdBy: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    participants: [groupParticipantSchema],
    messages: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'Message' 
    }],
    groupIcon: { 
        type: String, 
        default: '' 
    },
    groupSettings: { 
        canAddMembers: { 
            type: Boolean, 
            default: true 
        },
        canChangeName: { 
            type: Boolean, 
            default: true 
        },
        canRemoveMembers: { 
            type: Boolean, 
            default: true 
        },
        canChangeGroupIcon: { 
            type: Boolean, 
            default: true 
        },
        canDeleteMessages: { 
            type: Boolean, 
            default: true 
        },
        canMuteMembers: { 
            type: Boolean, 
            default: true
        }
    },
    stream: { 
        type: Schema.Types.ObjectId, 
        ref: 'Stream'  
    },
    isDeleted: { 
        type: Boolean, 
        default: false 
    },
    inviteCode: { 
        type: String 
    },
    groupPrivacy: { 
        type: String, 
        enum: ['open', 'closed', 'secret'], 
        default: 'closed' 
    },
}, { timestamps: true });

groupSchema.index({ 'participants.user': 1 });
groupSchema.index({ createdBy: 1 });
groupSchema.index({ isDeleted: 1 });

export const Group = mongoose.model('Group', groupSchema);
