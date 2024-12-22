import mongoose, { Schema } from 'mongoose';

const callParticipantSchema = new Schema({
    user: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    status: { 
        type: String, 
        enum: ['joined', 'left', 'missed', 'pending'], 
        default: 'pending' 
    },
    isMuted: { 
        type: Boolean, 
        default: false 
    },
    isVideoEnabled: { 
        type: Boolean, 
        default: true 
    },
    joinedAt: { 
        type: Date, 
        default: Date.now 
    },
    leftAt: { 
        type: Date 
    }
}, { timestamps: true });

const callSchema = new Schema({
    type: { 
        type: String, 
        enum: ['video', 'audio'], 
        required: true 
    },
    host: { 
        type: Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    participants: [callParticipantSchema],
    startTime: { 
        type: Date, 
        default: Date.now 
    },
    endTime: { 
        type: Date 
    },
    status: { 
        type: String, 
        enum: ['active', 'ended', 'missed', 'waiting'], 
        default: 'waiting' 
    },
    callDuration: { 
        type: Number, // duration in seconds 
        default: 0 
    },
    permissions: {
        canMute: { 
            type: Boolean, 
            default: false 
        },
        canEnableVideo: { 
            type: Boolean, 
            default: false 
        }
    },
    archivedAt: { 
        type: Date 
    },
}, { timestamps: true });


callSchema.pre('save', function (next) {
    if (this.status === 'ended' && this.endTime && !this.callDuration) {
        const duration = Math.floor((this.endTime - this.startTime) / 1000); 
        this.callDuration = duration;
    }
    next();
});


callSchema.index({ host: 1, status: 1 });
callSchema.index({ participants: 1 });
callSchema.index({ startTime: -1 });

export const Call = mongoose.model('Call', callSchema);
