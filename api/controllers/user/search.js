module.exports = async function (req, res) {
    
    const users = await User.find({id: {'!=': req.session.userId}}) // Find the current users is not incloud current login user
    const currentUser = await User.findOne({ id: req.session.userId }).populate('following')

    currentUser.following.forEach(f => {
        console.log(f.fullName)
        users.forEach(u => {
            if (f.id === u.id) { //check if f.id exist in the users
                u.isFollowing = true
            }
        })
    })

    const sanitizedUsers = users.map(u => {
        return {id: u.id, fullName: u.fullName, emailAddress: u.emailAddress, isFollowing: u.isFollowing, profileImageUrl: u.profileImageUrl}
    })

    if (req.wantsJSON) {
       return res.send(sanitizedUsers)
    }

    res.view("pages/user/search", {
        layout: 'layouts/nav-layout',
        users: sanitizedUsers
    });
}