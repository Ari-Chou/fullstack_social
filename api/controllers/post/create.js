module.exports = function (req, res) {
  const postBody = req.body.PostBody;
  console.log("create a new Post:", postBody);
};
