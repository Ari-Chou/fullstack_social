module.exports = async function (req, res) {
  
  //await Post.destroy({})
  const userId = req.session.userId;
  const allPosts = await Post.find({ user: userId }).populate('user').sort("createdAt DESC");

  if (req.wantsJSON) {
      res.send(allPosts)
  }

  allPosts.forEach(p => {
    p.user = {id: p.user.id, fullName: p.user.fullName}
  });
  
  res.view("pages/post/home", {
    allPosts,
    layout: "layouts/nav-layout"
  });
}; 
