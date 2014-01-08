/**
 * Upload
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {
  
  schema: true,
  
  attributes: {
  	
  	/* e.g.
  	nickname: 'string'
  	*/
    message: {
    	type: 'string'
  	},
  	source: {
  	  type: 'string',
    },
    medialurl: {
      type: 'string'
    }
  },

};
