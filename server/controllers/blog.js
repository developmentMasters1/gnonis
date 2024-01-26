const { Blog, UserBlogMetadata } = require("../model/blog");
const { TopPosts, RecentPosts, MostViewedPosts } = require("../model/trending");
const { User } = require("../model/user");

let addBlog = async (req, res) => {
  try {
    const data = req.body;
    const blog = new Blog({
      blog_article: data.blog_article,
    });

    const blogData = await blog.save();

    const blogMetaData = new UserBlogMetadata({
      blog_title: data.blog_title,
      blog_info: data.blog_info,
      blog_img: data.blog_img,
      category: data.blog_category,
      author_username: data.author_username,
      blog_last_updated: data.blog_last_updated || Date.now(),
      blog: blogData._id,
    });

    const _blogMetaData = await blogMetaData.save();
    const userInfo = await User.findOne({ username: data.author_username });
    userInfo.userBlogs.push(_blogMetaData._id);
    await userInfo.save();

    res.status(200).json({ msg: "Blog added successfully", data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occurred" });
  }
};

let getBlogData = async (req, res) => {
  try {
    console.log(req.params.id);
    const userBlogMetadata = await UserBlogMetadata.findOne({
      _id: req.params.id,
    });

    userBlogMetadata.view_count += 1;
    await userBlogMetadata.save();

    const userDataContent = await Blog.find({ _id: userBlogMetadata.blog }).populate('comments');

    res
      .status(200)
      .json({ blogMetaData: userBlogMetadata, blogData: userDataContent });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occurred" });
  }
};

let updateBlogData = async (req, res) => {
  try {
    const data = req.body;
    const id = data.id;
    Blog.findByIDAndUpdate(id, { blog_article: data.blog_article });
    UserBlogMetadata.findOneAndUpdate(
      { blog: id },
      {
        blog_title: data.blog_title,
        blog_info: data.blog_info,
        blog_img: data.blog_img,
        blog_category: data.blog_category,
        blog_last_updated: data.blog_last_updated || Date.now(),
      }
    );
    res.status(200).json({ msg: "Updated successfully", data });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occurred" });
  }
};

let getBlogByCategory = async (req, res) => {
  try {
    const category = req.params.category;
    const blogMetaData = await UserBlogMetadata.find({ category: category });
    res.status(200).json({ blogMetaData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occurred" });
  }
};

let getTrendingBlog = async (req, res) => {
  try {
    const blogMetaData = await TopPosts.find();
    res.status(200).json({ blogMetaData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occurred" });
  }
};

let getBlogByKeyword = async (req, res) => {
  try {
    const keyword = req.params.keyword;
    const blogMetaData = await UserBlogMetadata.find({
      blog_title: { $regex: keyword, $options: "i" },
    });
    res.status(200).json({ blogMetaData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occurred" });
  }
};

let getRecentBlog = async (req, res) => {
  try {
    const blogMetaData = await RecentPosts.finq();
    res.status(200).json({ blogMetaData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occurred" });
  }
};

let getMostViewedBlog = async (req, res) => {
  try {
    const blogMetaData = await MostViewedPosts.find();
    res.status(200).json({ blogMetaData });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occurred" });
  }
};

let getUserBlogData = async (req, res) => {

  const user = await User.findOne({ username: req.user.username });
  const userBlogs = await UserBlogMetadata.find({ _id: user.userBlogs });

  res.status(200).json({ userBlogs });



}
module.exports = {
  updateBlogData,
  getBlogData,
  addBlog,
  getBlogByCategory,
  getTrendingBlog,
  getBlogByKeyword,
  getRecentBlog,
  getMostViewedBlog,
  getUserBlogData
};
