
module.exports = {

   get: function (req, res) {
    res.sendfile(req.path.substr(1));
  }
  
};


/**
 * FilesController
 *
 * @module    :: Controller
 * @description :: Contains logic for handling files upload .
 */

