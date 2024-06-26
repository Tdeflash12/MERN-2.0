const multer = require("multer");
 const storage = multer.diskStorage({
    destination:function(req,file,cb){
       
       const allowedFiletype=['image/png','image/jpeg','image/jpg']
        if(!allowedFiletype.includes(file.mimetype)){
            cb(new Error("This file type is not supported")) //cb error
            return
        }          
cb(null, "./storage")
    },
    filename: function (req,file,cb){
        cb(null,Date.now() +"-"+file.originalname)
    }
})
module.exports = {
    storage,
    multer

}