module.exports = {
   get: function (req, res) {
    res.sendfile(req.path.substr(1));
  },
  _config: {
    rest: true,
    shortcuts: true
  }
};