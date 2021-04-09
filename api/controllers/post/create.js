module.exports = async function (req, res) {
  const postBody = req.body.postBody; // Get the input value

  const userId = req.session.userId
  const file = req.file('imagefile')

  const fileUrl = await sails.helpers.uploadFile(file)
  await Post.create({ text: postBody, user: userId, imageUrl: fileUrl }).fetch();
  res.redirect("/post");
};
