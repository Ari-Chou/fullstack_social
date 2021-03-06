module.exports = {

  customToJSON: function() {
    const fromNow = sails.moment(this.createdAt).fromNow() // sails moment is in the bootstrap.js
    this.fromNow = fromNow
    return this
  },


  attributes: {
    text: {
      type: "string",
      required: true,
    },
    imageUrl: {
      type: "string",
      defaultsTo: "",
    },
    user: {
      model: "user"
    },
  },
};
