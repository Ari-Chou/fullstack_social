module.exports = async function (req, res) {
    console.log(req.param('id'))
    const currentUserId = req.session.userId
    const userIdToFollowing = req.param('id')
    await User.addToCollection(currentUserId, 'following', userIdToFollowing) //Just like the firebase collection
    res.send()
}