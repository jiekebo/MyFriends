var Backbone = require('backbone');
var User = require('../model/User');
var Config = require('../config');

module.exports = Backbone.Collection.extend({

    model: User,
    url: Config.URL + Config.API + '/user/1',
    idAttribute: 'id'

});