module.exports = async function (req, res) {
    console.log(req.param('id'))
    const currentUserId = req.session.userId
    const userIdToUnfollow = req.param('id')
    await User.removeFromCollection(currentUserId, 'following', userIdToUnfollow)
    await User.removeFromCollection(userIdToUnfollow, 'followers', currentUserId)

    //delete all feed items for we unfollowed id
    await FeedItem.destroy({postOwner: userIdToUnfollow})
    res.send()
}