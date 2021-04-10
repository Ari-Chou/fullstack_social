module.exports = async function (req, res) {
    console.log("creating a comment")
    const postId = req.param('id')
    const user = req.session.userId

    await Comment.create({
        text: req.body.text,
        post: postId, // post associated with this postId
        user: user
    })
    res.redirect('/post/' + postId)
}