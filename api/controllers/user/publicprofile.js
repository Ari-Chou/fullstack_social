module.exports = async function (req, res) {
    console.log("show public profile page")
    const id = req.param('id')
    const user = await User.findOne({ id: id }).populate('following').populate('followers')
    
    const posts = await Post.find({ user: id }).sort('createdAt DESC').populate('user')
    user.posts = posts

    user.followers.forEach(f => { // in the bublicProfile page
        if (f.id === req.session.userId) {
            user.isFollowing = true
        }
    })

    const userObject = JSON.parse(JSON.stringify(user))
    userObject.isFollowing = user.isFollowing

    if (req.wantsJSON) {
        res.send(userObject)
    }

    res.view('pages/user/publicprofile', {
        layout: 'layouts/nav-layout',
        user: userObject
    })
}