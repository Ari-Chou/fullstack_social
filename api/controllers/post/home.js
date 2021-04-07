module.exports = async function (req, res) {
  
  //await Post.destroy({})
  const userId = req.session.userId;
  const allPosts = await Post.find({ user: userId }).populate('user').sort("createdAt DESC");

  if (req.wantsJSON) {
      res.send(allPosts)
  }

  // allPosts.forEach(p => {
  //   p.user = {id: p.user.id, fullName: p.user.fullName}
  // });

  // use this function to custom exposed data
  // why we can use this to custom exposed data, because we will call the User Model customToJSON()
  const string = JSON.stringify(allPosts)
  const objects = JSON.parse(string) 


  res.view("pages/post/home", {
    allPosts: objects,
    layout: "layouts/nav-layout"
  });
}; 
