module.exports = async function (req, res) {
    console.log('apple')
    const fullName = req.body.fullName
    const bio = req.body.bio
    const file = req.file('imageFile')

    if (file.isNoop) { // the file include a isNoop propertise
        //Update current user info
        await User.update({ id: req.session.userId }).set({fullName: fullName, bio: bio})
        file.upload({ noop: true })
        return res.send()
    }

    const fileUrl = await sails.helpers.uploadFile(file) // attention the function name spell
    const record = await User.update({ id: req.session.userId }).set({ fullName: fullName, bio: bio, profileImageUrl: fileUrl}).fetch()
    console.log(JSON.parse(JSON.stringify(record)))
    res.send()
}