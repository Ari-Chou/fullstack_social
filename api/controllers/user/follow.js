module.exports = async function (req, res) {
    console.log(req.param('id'))
    const currentUserId = req.session.userId
    const userIdToFollow = req.param('id')
    await User.addToCollection(currentUserId, 'following', userIdToFollow) //Store the third parameter under the first parameter of the ‘following’.

    // find all posts belong my followed user
    const postsFromMyFollowing = await Post.find({ user: userIdToFollow })

    postsFromMyFollowing.forEach( async p => {
        console.log("this is my following user post id",p.id)

        await FeedItem.create({ // base on the sails waterline we ca use the post id to get the post object
            post: p.id,
            user: currentUserId,
            postOwner: userIdToFollow,
            postCreatedAt: p.createdAt
        })
    });

    //Store the third parameter under the first parameter of the 'followers'
    //Just like transferring money into other's accounts
    await User.addToCollection(userIdToFollow, 'followers', currentUserId)
   
    res.send()
}