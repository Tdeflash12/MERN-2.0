const express = require("express")
const app = express()

const connectTODatabase =require("./database");
const Book = require("./model/bookModel");

app.use(express.json())

connectTODatabase()

app.get("./",(req , res)=>{

    res.status(201).json({
        message: "success"
    })
}) 
app.post("/book",async(req,res)=>{

    const {bookName,bookPrice,isoNumber,authorName,publishedAt,publication} =req.body
 await Book.create({
    bookName,
    bookPrice,
    isoNumber,
    authorName,
    publishedAt,
    publication
})
res.json({
    message: "Book Created Successfully"
}) 
})
app.get("/book",async(req,res)=>{
    const books= await Book.find() // return array nai grxwww
    console.log(books)
    res.status(200).json({
     message :"Books fetched successfully",
     data: books
    })
 })
 // single read
 app.get("/book/:id",async(req,res)=>{
     const id =req.params.id
     const book = await Book.findById(id) // return object garxwwwwwwwww
    if (!book){
        res.status(404).json({
            message : "nothing found",
           
        })
    }else{
    res.status(200).json({
        message : "Single book fetched successffully",
        data: book
    })
}
})
app.listen(3000,()=>{
    console.log("Node js server Started at the Port 3000");
})
 