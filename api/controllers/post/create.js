module.exports = async function (req, res) {
  const postBody = req.body.postBody; // Get the input value

  const userId = req.session.userId
  const file = req.file('imagefile')

  try {

    const fileUrl = await sails.helpers.uploadFile(file)
    const record =  await Post.create({ text: postBody, user: userId, imageUrl: fileUrl }).fetch();

    // also create FeedItems
    await FeedItem.create({
      post: record.id,
      postOwner: userId,
      user: userId,
      postCreatedAt: record.createdAt
  })
    res.redirect("/post");
    
  } catch (error) {
    res.serverError(error.toString())
  }
  
};
