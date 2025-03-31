/**
 * Created by Syed Suhaib Zia
 * Created At: 03/30/2025 12:00 PM
 * Version: 1.0.0
 */
// upload.js
const multer = require('multer');
const path = require('path');

// Set storageConfig engine
const storageConfig = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        let fileBaseName = path.parse(file.originalname).name;
        fileBaseName = fileBaseName.replace(/\s/g, '') + '-' + Date.now() + path.extname(file.originalname);
        cb(null, fileBaseName);
    }
});


// Initialize upload
const upload = multer({
    storage: storageConfig,
    limits: { fileSize: 5000000 }, // 5MB
    fileFilter: function(req, file, cb){
        checkFileType(file, cb);
    }
}).array('images[]');

// Check file type
function checkFileType(file, cb){
    // Allowed file extensions
    const filetypes = /jpeg|jpg|png|gif/;
    // Check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    // Check mimetype
    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

module.exports = { upload };
