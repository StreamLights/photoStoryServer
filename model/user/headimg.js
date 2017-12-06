import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const headImgSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    img: {
        type: String,
        require: true
    }
}, { collection: 'headimg' });

export var HeadImg = mongoose.model('headimg', headImgSchema);