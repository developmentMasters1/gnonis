const cron = require("node-cron");
const { UserBlogMetadata } = require("../model/blog");
const { MostViewedPosts } = require("../model/trending");

cron.schedule("0 0 * * *", async () => {
  try {
    const data = await UserBlogMetadata.find({})
      .sort({ blog_views: "desc" })
      .limit(20);

    await MostViewedPosts.deleteMany();
    await MostViewedPosts.insertMany(data);
  } catch (err) {
    console.log("Error in  service/trending", err);
  }
});
