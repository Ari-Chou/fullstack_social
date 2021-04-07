module.exports = async function (req, res) {
  const postBody = req.body.postBody; // Get the input value

  const file = req.file('imagefile')
  //Upload image file to AWS
  const options =
      { // This is the usual stuff
        adapter: require('skipper-better-s3')
      , key: 'AKIATCEUEXCS5AO42BNA'
      , secret: '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'
      , bucket: 'fullstack-socials'
      , s3params:
        { ACL: 'public-read'
        }
        // And while we are at it, let's monitor the progress of this upload
      , onProgress: progress => sails.log.verbose('Upload progress:', progress)
      }
 
  file.upload(options, async (err, files) => {
    if (err) {return res.serverError(err.toString())}
    console.log(files)

    const fileUrl = files[0].extra.Location;
    const userId = req.session.userId;
    await Post.create({ text: postBody, user: userId, imageUrl: fileUrl }).fetch();
    res.redirect("/post");
  })


  // const userId = req.session.userId; // when you login the sails while generate the userId
  // await Post.create({ text: postBody, user: userId }).fetch(); // Create Post
  // res.redirect("/post");
  // console.log("create a new Post:", postBody);
};
