module.exports = async function (req, res) {
    console.log('show post detail view')
    const postId = req.param('id')
    const post = await Post.findOne({ id: postId }).populate('user')

    // fetch comments when we want show the post detail
    const comments = await Comment.find({
        post: postId
    }).sort('createdAt DESC').populate('user')

    comments.forEach(c => {
        c.fromNow = sails.moment(c.createdAt).fromNow()
    })

    post.comments = comments

    if (req.wantsJSON) {
        return res.send(post)
    }
    
    res.view('pages/post/index', {
        layout: 'layouts/nav-layout',
        post: JSON.parse(JSON.stringify(post))
    })

    //res.send(post)
}