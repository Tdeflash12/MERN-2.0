const express = require("express")
const app = express()
const fs = require('fs')
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
// Create Book
app.post("/book",upload.single("image"),async(req,res)=>{
    console.log(req.file)
    let fileName ;
        if(!req.file){
            fileName="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1677509740.jpg"
        }
        else{
            fileName="http://localhost:3000/" + req.file.filename
        }
    


    const {bookName,bookPrice,isoNumber,authorName,publishedAt,publication,imageUrl} =req.body
 await Book.create({
    bookName,
    bookPrice,
    isoNumber,
    authorName,
    publishedAt,
    publication,
    imageUrl : fileName
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
app.patch("/book/:id",upload.single("image"),async(req,res)=>{
    const id =req.params.id // kun book update grney id yo ho
    const {bookName,bookPrice,isoNumber,authorName,publishedAt,publication,isbrNumber} =req.body
  const oldDatas =  await Book.findById(id)
  let fileName;
    if (req.file){
        console.log(req.file)
        console.log(oldDatas)
        const oldImagePath =oldDatas.imageUrl
        console.log(oldImagePath)
        const localHostUrlLength= "http://localhost:3000/".length
        const newImageOldPath = oldImagePath.slice(localHostUrlLength)
   fs.unlink(`storage/${newImageOldPath }`,
    (err)=>{
    if(err){
        console.log(err)
    }else{
        console.log("file Deleted Successfully")
    }
   })
    }
    fileName="http://localhost:3000/" + req.file.filename
  
    await Book.findByIdAndUpdate(id,{
        bookName: bookName,
        bookPrice: bookPrice,
        isoNumber: isoNumber,
        authorName: authorName,
        publishedAt: publishedAt,
        publication: publication,
        isbrNumber:isbrNumber,
        imageUrl: fileName
    })
    res.status(200).json({
        message: "Book updated Successfully"
    })
})
app.use(express.static("./storage"))

app.listen(3000,()=>{
    console.log("Node js server Started at the Port 3000");
})
 // Abhesh Mandal 