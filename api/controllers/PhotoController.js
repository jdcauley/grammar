/**
 * PhotosController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
	create: function(req, res) {
		var fs = require('fs-extra');
    
		var tmp_path = req.files.file.path;
		var message = req.param('message');
		var name = tmp_path.substr(tmp_path.lastIndexOf('/', tmp_path.length));
		console.log(name);
		var target_path = '.tmp/public/uploads/photos' + name;

		fs.copy(tmp_path, target_path, function(err) {
			if (err) throw err;
			fs.copy(target_path, 'assets/uploads/photos' + name, function(err) { });
			fs.unlink(tmp_path, function() {
				if (err) throw err;
				console.log('File uploaded to: ' + target_path);
				Photo.create( { url: 'assets/uploads/photos' + name, filename: name, message: message }).done(function(err, p) {
  				if (err) {
    				console.log(err);
    				  res.set('error', 'DB Error');
    				  res.send(500, {error: 'DB Error'});
    				} else {
    				  res.redirect('/photo/');
    				
  				}
				});
				
				//res.json( { filelink: '/images/photos' + name } );
			});
		});
		// Photo.create( {file}
	},
  /*
	create: function(req, res) {
		var id = req.body.postId;
		var photos = req.body.photos;
		console.log("photos:  " + photos);
		photos.forEach(function(photo) {
			Photo.create( {postId: id, filename: photo} ).done(function(err, p) {
				if (err) {
					console.log(err);
       				res.set('error', 'DB Error');
        			res.send(500, { error: 'DB Error'});
        		}
			});
		});
	},
  
	index: function(req, res) {
		Photo.find().done(function(err, photos) {
			console.log(photos);
			res.view({ model: photo });
      // res.json(photo)

		});
		//console.log(photos);
	},
  */
  _config: {}

};
