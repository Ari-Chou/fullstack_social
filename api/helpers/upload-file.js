module.exports = {


  friendlyName: 'Upload file',


  description: '',


  inputs: {
    file: {
      type: 'ref',
      description: 'use this helper to upload file to AWS S3.',
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {
    console.log("excuting the sails Helper")

    const file = inputs.file
    // AWS Init
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
      return exits.success(fileUrl) // if we success upload the file, sails will return the fileUrl.
    })
  }


};

