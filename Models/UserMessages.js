const mongoose=require('mongoose');

const MessageSchema = new mongoose.Schema({
    OTP:{type:Number},
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'users',require:true},
    createdAt: { type: Date, immutable: true, default: () => new Date() },
    updatedAt: { type: Date, default: new Date() }
})

module.exports=mongoose.model('messages',MessageSchema);
