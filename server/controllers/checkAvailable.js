const { User } = require("../model/user.js");

const checkUsername = async (req, res) => {
  try {
    const username = req.body.username;
    const user = await User.findOne({ name: username });

    if (user) {
      res.status(409).json({ msg: "Username already taken" });
    } else {
      res.status(200).json({ msg: "Username available" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occurred" });
  }
};

const checkEmail = async (req, res) => {
  try {
    const email = req.body.email;;
    const user = await User.findOne({ emailId: email });

    if (user) {
      res.status(409).json({ msg: "Username already taken" });
    } else {
      res.status(200).json({ msg: "Username available" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "An error occurred" });
  }
};

module.exports = { checkUsername, checkEmail };
