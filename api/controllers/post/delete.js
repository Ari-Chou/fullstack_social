module.exports = async function (req, res) {
    const postId = req.param('postId')
    try {
        await Post.destroy({ id: postId, user: req.session.userId })
        await FeedItem.destroy({ post: postId })
        res.send()
    } catch (error) {
        res.serverError(error.toString())
    }
}