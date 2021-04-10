module.exports = async function (req, res) {
  
  //await Post.destroy({})
  const userId = req.session.userId;

  // base on we followed user we will re
  // const allPosts = await Post.find({ user: userId }).populate('user').sort("createdAt DESC");
  const allPosts = []
  const feeditems = await FeedItem.find({ user: userId })
    .sort('postCreatedAt DESC')
    .populate('post')
    .populate('postOwner')
  
  feeditems.forEach(f => {
    console.log(f.post)
    if (f.post) {
      f.post.user = f.postOwner // because you should use user to setup user fullName profileImagr ect...
      f.post.canDelete = f.post.user.id == req.session.userId
      allPosts.push(f.post)
    }
  })

  if (req.wantsJSON) {
      res.send(allPosts)
  }
  // use this function to custom exposed data
  // we do not change the model so we can use this function, in the search.js controller we use other function to custom exposed data.
  // why we can use this to custom exposed data, because we will call the User Model customToJSON()
  const string = JSON.stringify(allPosts)
  const objects = JSON.parse(string) 


  res.view("pages/post/home", {
    allPosts: objects,
    layout: "layouts/nav-layout"
  });
}; 
