module.exports = async function (req, res) {
    const users = await User.find({ id: "1" })
    const objc = []

    // Splic user info
    users.forEach(user => {
        objc.push({ id: user.id, fullName: user.fullName, email: user.emailAddress})
    });

    res.send(users)
}