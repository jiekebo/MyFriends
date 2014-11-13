var Backbone = require('backbone');
var config = require('../config');

module.exports = Backbone.Model.extend({

    url: config.URL + config.API + '/user'

});
