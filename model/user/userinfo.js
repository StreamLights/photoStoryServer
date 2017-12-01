import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const userInfoSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    }
}, { collection: 'userinfo' });      // 自定义表名，避免表名出现复数

export var UserInfo = mongoose.model('userinfo', userInfoSchema);