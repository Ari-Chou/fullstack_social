module.exports = async function (req, res) {
  const postBody = req.body.PostBody; // Get the input value
  await Post.create({ text: postBody }); // Create Post

  const posts = await Post.find({}); // Get the Posts
  res.send(posts); // Send back to browser
  console.log("create a new Post:", postBody);
};
