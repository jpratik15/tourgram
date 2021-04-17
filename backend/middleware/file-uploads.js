const multer = require('multer');
const { v4: uuidv1 } = require('uuid');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'
}
const fileUpload = multer({
    limit: 500000,
    storage : multer.diskStorage({
        destination :(req,file,cb)=> {
            cb(null,"uploads/images")
        } ,
        filename : (req,file,cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, uuidv1() + '.' + ext);
        }
    }),
    fileFilter : (req,file,cb) => {
        let isValid = !!MIME_TYPE_MAP[file.mimetype];
        let error = isValid ? null : new Error("Invalid File Type");
        cb(error,isValid);
    }
    
})
module.exports = fileUpload;