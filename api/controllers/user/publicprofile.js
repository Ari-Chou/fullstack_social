module.exports = async function (req, res) {
    console.log("show public profile page")
    const id = req.param('id')
    const user = await User.findOne({ id: id }).populate('following').populate('followers')
    
    const userObject = JSON.parse(JSON.stringify(user))

    res.view('pages/user/profile', {
        layout: 'layouts/nav-layout',
        user: userObject
    })
}