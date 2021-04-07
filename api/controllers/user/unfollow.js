module.exports = async function (req, res) {
    console.log(req.param('id'))
    const currentUserId = req.session.userId
    const userIdToUnfollow = req.param('id')
    await User.removeFromCollection(currentUserId, 'following', userIdToUnfollow)
    res.send()
}