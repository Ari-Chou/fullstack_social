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
    
    // when we create a post we will insert to all of my followers 
    const user = await User.findOne({ id: userId }).populate('followers')
    user.followers.forEach( async f => {
      await FeedItem.create({
        post: record.id,
        postOwner: userId,
        user: f.id,
        postCreatedAt: record.createdAt
      })
    })
    
    res.send()
  } catch (error) {
    res.serverError(error.toString())
  }
  
};
