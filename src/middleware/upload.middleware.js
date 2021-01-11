const multer = require('multer');
const upload = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, callback) {
    console.log(file.originalname);
    if (!file.originalname.match(/\.(jpg|jpeg|pdf)$/)) {
      callback(new Error('FIle must be an JPG,JPEG or PDF'));
    }
    callback(undefined, true);
  },
});

module.exports = upload;
