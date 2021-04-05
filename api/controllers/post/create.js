module.exports = async function (req, res) {
  const postBody = req.body.PostBody; // Get the input value
  const userId = req.session.userId; // when you login the sails while generate the userId
  await Post.create({ text: postBody, user: userId }).fetch(); // Create Post
  res.redirect("/post");
  console.log("create a new Post:", postBody);
};
