var Backbone = require('backbone');
var config = require('../config');

module.exports = Backbone.Model.extend({

    urlRoot: config.URL + config.API + '/user',

    idAttribute: "_id",

    login: function(callback, args) {
        var self = this;
        this.fetch({
            data: args,
            success: function (mod, res) {
                self.set({logged_in: true});
                var authString = self.createBasicAuthString(args.username, args.password);
                self.ajaxConfig(authString);
                localStorage.setItem('auth', authString);
                localStorage.setItem('user', JSON.stringify(res));
                if ('success' in callback) callback.success(mod, res);
            }, error: function (mod, res) {
                self.set({logged_in: false});
                if ('error' in callback) callback.error(mod, res);
            }
        });
    },

    logout: function() {
        localStorage.removeItem('configurator');
        localStorage.removeItem('configurator_user');
        this.clear();
        $.ajaxSetup({
            headers: {}
        });
    },

    ajaxConfig: function(authString) {
        $.ajaxSetup({
            headers: {'Authorization': 'Basic ' + authString}
        });
    },

    loadUser: function() {
        var userData = JSON.parse(localStorage.getItem('configurator_user'));
        this.set({
            address: userData.address,
            email: userData.email,
            firstname: userData.firstname,
            lastname: userData.lastname,
            username: userData.username,
            logged_in: true
        });
    },

    createBasicAuthString: function(username, password) {
        return btoa(username + ':' + password);
    }

});
