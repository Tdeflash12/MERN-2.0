const express = require("express")
const app = express()

const connectTODatabase =require("./database");
const Book = require("./model/bookModel");
// multerconfig imports here

const {multer,storage }= require("./middleware/multerConfig")
const upload = multer({storage: storage})
//Alternative
// const app = require("express")[]
app.use(express.json())

connectTODatabase()

app.get("./",(req , res)=>{

    res.status(201).json({
        message: "success"
    })
}) 
app.post("/book",upload.single("image"),async(req,res)=>{

    const {bookName,bookPrice,isoNumber,authorName,publishedAt,publication} =req.body
 await Book.create({
    bookName,
    bookPrice,
    isoNumber,
    authorName,
    publishedAt,
    publication
})
res.status(201).json({
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
// delete operation 
app.delete("/book/:id",async(req,res)=>{
    const id =req.params.id
    await Book.findByIdAndDelete(id)
    res.status(200).json({
        message: "Book Deleted Successfully"
    })
})

// update  operation
app.patch("/book/:id",async(req,res)=>{
    const id =req.params.id // kun book update grney id yo ho
    const {bookName,bookPrice,isoNumber,authorName,publishedAt,publication,isbrNumber} =req.body
    await Book.findByIdAndUpdate(id,{
        bookName: bookName,
        bookPrice: bookPrice,
        isoNumber: isoNumber,
        authorName: authorName,
        publishedAt: publishedAt,
        publication: publication,
        isbrNumber:isbrNumber,
    })
    res.status(200).json({
        message: "Book updated Successfully"
    })
})

app.listen(3000,()=>{
    console.log("Node js server Started at the Port 3000");
})
 