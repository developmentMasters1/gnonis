require("dotenv").config();

const { UserBlogMetadata } = require("../model/blog");
const jwt = require("jsonwebtoken");

// Check if the user is authenticated
const authenticateUser = (req, res, next) => {
  try {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occurred" });
  }
};

// Check if the user is the owner of the blog
const confirmBlogOwner = async (req, res, next) => {
  try {
    const blogMetadata_id = req.body.id;

    const blogMetadata = await UserBlogMetadata.findById(blogMetadata_id);

    if (blogMetadata.author_username != req.user.name)
      return res
        .sendStatus(401)
        .json({ msg: "You are not the owner of this blog" });

    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occurred" });
  }
};

module.exports = { authenticateUser, confirmBlogOwner };
