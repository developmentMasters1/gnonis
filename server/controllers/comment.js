const { Comment, Blog } = require("../model/blog.js");

let addComment = async (req, res) => {
  try {
    const data = req.body;
    const blog_id = req.params.id;

    if (data.parent_id == "") {
      const newComment = new Comment({
        text: data.text,
        created_at: data.created_at,
        user: data.user,
      });
      const comment = await newComment.save();
      const blog = await Blog.findOneAndUpdate(
        { id: blog_id },
        { $push: { comments: comment._id } }
      );
    } else {
      const newComment = new Comment({
        text: data.text,
        created_at: data.created_at,
        user: data.user,
        parent_id: data.parent_id,
      });

      const comment = await newComment.save();
      const parent_comment = await Comment.findOneAndUpdate(
        { id: data.parent_id },
        { $push: { replies: comment._id } }
      );
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occurred" });
  }
};

module.exports = { addComment };
