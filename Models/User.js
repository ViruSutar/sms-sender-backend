const mongoose=require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName:{type:String},
    lastName:{type:String},
    mobileNumber:{type:Number,length:10,unique:true},
    createdAt: { type: Date, immutable: true, default: () => new Date() },
    updatedAt: { type: Date, default: new Date() }
})

module.exports=mongoose.model('users',UserSchema);
