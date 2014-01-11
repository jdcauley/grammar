var sid = require('shortid');
var fs = require('fs');
var mkdirp = require('mkdirp');
//var io = require('socket.io');
 
var UPLOAD_PATH = 'uploads';
 
// Setup id generator
sid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@');
sid.seed(42);
 
function safeFilename(name) {
  name = name.replace(/ /g, '-');
  name = name.replace(/[^A-Za-z0-9-_\.]/g, '');
  name = name.replace(/\.+/g, '.');
  name = name.replace(/-+/g, '-');
  name = name.replace(/_+/g, '_');
  return name;
}
 
function fileMinusExt(fileName) {
  return fileName.split('.').slice(0, -1).join('.');
}
 
function fileExtension(fileName) {
  return fileName.split('.').slice(-1);
}
 
// Where you would do your processing, etc
// Stubbed out for now
function processImage(id, name, path, cb) {
  console.log('Processing image');
 
  cb(null, 'http://dev.cauley.co:1337/' + path );
  
}
 
 
module.exports = {

  create: function (req, res) {
  
  
    var file = req.files.media,
      id = sid.generate(),
      fileName = file.name,
      dirPath = UPLOAD_PATH + '/' + id,
      filePath = dirPath + '/' + fileName;
 
    try {
      mkdirp.sync(dirPath, 0755);
    } catch (e) {
      console.log(e);
    }
 
    fs.readFile(file.path, function (err, data) {
      if (err) {
        res.json({'error': 'could not read file'});
      } else {
        fs.writeFile(filePath, data, function (err) {
          if (err) {
            res.json({'error': 'could not write file to storage'});
          } else {
            processImage(id, fileName, filePath, function (err, data) {
              if (err) {
                res.json(err);
              } else {
                
                  
                  res.json(data);
                
              }
            });
          }
        })
      }
    });
  Upload.create(req.params.all(), function uploadCreated (err, upload) {
  
    var medialurl = processImage('cb')
    /*
    if (err) {
        console.log(err);
        req.session.flash = {
          err: err
        }
        
        // If error redirect back to sign-up page
          return res.redirect('/');
      }
      
      
      
      // After successfully creating user
      // redirect to the show action
      
      // res.json(user);
      res.json(upload);
      */
    
  });
  },
  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to GifController)
   */
  _config: {}
};

/*

yourModel.findOne(10).exec(function(err, foo) { if (!err && foo) { foo.url = "asdf"; foo.save(); } );

*/



