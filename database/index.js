const mongoose =require("mongoose")
const ConnectionString ="mongodb+srv://abheshmandal249:abheshmandal@cluster0.x728unh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
async function connectTODatabase(){
    await mongoose.connect(ConnectionString)
    console.log("Connected To Database Successfullly");
}
module.exports = connectTODatabase