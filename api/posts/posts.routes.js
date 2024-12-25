const express = require('express');
// const multer = require("multer")
// const storage = multer.diskStorage({
//   destination: './media',
//   filename: (req, file, cb) => {
//     cb(null, `${+new Date()}${file.originalname}`);
//   },
// });

// const upload = multer({
//   storage,
// });


const router = express.Router();



const {
  postsGet,
  postsUpdate,
  postsDelete,
  postsCreate,
} = require('./posts.controllers');

const upload = require("../../middleware/multer");

router.get('/', postsGet);
router.post('/',  upload.single('image'), postsCreate);

router.delete('/:postId', postsDelete);

router.put('/:postId', postsUpdate);

module.exports = router;
