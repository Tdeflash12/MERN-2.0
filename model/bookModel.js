 const mongoose = require("mongoose") 
const Schema= mongoose.Schema

 const bookSchema = new Schema({
    bookName :{
        unique : true,
        type:String
 
    },
    bookPrice :{
        type:Number
    }, 
    isbrNUmber :{
        type: Number
    },
    authorName :{
        type:String
    },
    publishedAt :{
        type:String
    },
    publication:{
        type:String
    }
 })

  const Book = mongoose.model('Book',bookSchema)
  module.exports = Book