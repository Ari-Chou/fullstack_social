module.exports = async function (req, res) {
    console.log("show public profile page")
    const id = req.param('id')
    const user = await User.findOne({ id: id }).populate('following').populate('followers')
    
    const posts = await Post.find({ user: id }).populate('user')
    user.posts = posts

    console.log(posts)
    const userObject = JSON.parse(JSON.stringify(user))

    res.view('pages/user/profile', {
        layout: 'layouts/nav-layout',
        user: userObject
    })
}