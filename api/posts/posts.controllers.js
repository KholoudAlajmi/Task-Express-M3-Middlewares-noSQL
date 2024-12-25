const Post = require("../../models/Post");

exports.postsCreate = async (req, res) => {
 if(req.file){
  req.body.image = `http://localhost:8000/media/${req.file.filename}`;
 }
  try {
    const newPost = new Post(req.body)
    const savedPost = await newPost.save() ;
    res.status(201).json(savedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.postsDelete = async (req, res) => {
  const { postId } = req.params;
  try {
    const foundPost = await Post.findById(postId);
    if (foundPost) {
      await foundPost.deleteOne();
      res.status(204).end();
    } else {
      res.status(404).json({ message: "post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.postsUpdate = async (req, res) => {
  const { postId } = req.params;
  try {
    const foundPost = await Post.findById(postId);
    if (foundPost) {
      await foundPost.updateOne(req.body);
      res.status(204).end();
    } else {
      res.status(404).json({ message: "post not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.postsGet = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
