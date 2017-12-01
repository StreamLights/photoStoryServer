import mongoose from 'mongoose'
const Schema = mongoose.Schema;
const articleSchema = new Schema({
    author: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true,
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        }
    }
}, { collection: 'article' });
export var  Article = mongoose.model('article', articleSchema);