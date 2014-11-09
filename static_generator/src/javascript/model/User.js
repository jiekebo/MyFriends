var Backbone = require('backbone');
var config = require('../config');

module.exports = Backbone.Model.extend({

    defaults: [
        'name',
        'age'
    ],
    urlRoot: config.URL + config.API + '/user/1'

});
