module.exports = async function (req, res) {
    console.log(req.param('id'))
    const currentUserId = req.session.userId
    const userIdToFollowing = req.param('id')
    await User.addToCollection(currentUserId, 'following', userIdToFollowing) //Store the third parameter under the first parameter of the ‘following’.
    
    //Store the third parameter under the first parameter of the 'followers'
    //Just like transferring money into other's accounts
    await User.addToCollection(userIdToFollowing, 'followers', currentUserId) 
    res.send()
}