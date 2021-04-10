
module.exports = async function (req, res) {
    const postId = req.param('id')

    try {
        await FeedItem.update({
            post: postId,
            user: req.session.userId
        }).set({ hasLiked: false })
        res.end()
    } catch (error) {
        res.serverError(error.toString())
    }
}