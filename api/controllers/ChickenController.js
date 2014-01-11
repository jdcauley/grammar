/**
 * ChickenController
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
    
  // Peck the chicken specified by id (subtract 50 HP)
  peck: function (req,res) {
    Chicken.find(req.param('id')).exec(function (err, chicken) {
      if (err) return res.send(err,500);
      if (!chicken) return res.send("No other chicken with that id exists!", 404);
      if (chicken.hp <= 0) return res.send("The other chicken is already dead!", 403);

      // Subtract 50 HP from the chicken
      chicken.hp -= 50;

      // Persist the change
      chicken.save(function (err) {
        if (err) return res.send(err,500);

        // Report back with the new state of the chicken
        res.json(chicken);
      });
    });

  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ChickenController)
   */
  _config: {}

  
};
