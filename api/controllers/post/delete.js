module.exports = async function (req, res) {
    const postId = req.param('postId')
    try {
        await Post.destroy({ id: postId, user: req.session.userId })
        res.end()
    } catch (error) {
        res.serverError(error.toString())
    }
}