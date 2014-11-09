var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var UserView = require('./view/User');
var Users = require('./collection/User');

var app = {};

app.session = Backbone.Model.extend({

    // Initialize with negative/empty defaults
    // These will be overriden after the initial checkAuth
    defaults: {
        logged_in: false,
        user_id: ''
    },

    initialize: function () {
        $.ajaxPrefilter(function(options, originalOptions, jqXHR) {
            options.crossDomain ={
                crossDomain: true
            };
        });
    }

});

app.router =  Backbone.Router.extend({
    initialize: function () {
        Backbone.history.start();
    },

    routes: {
        '': 'home',
        'home': 'home'
    },

    home: function () {
        var mainDiv = $('#main');
        var users = new Users();
        users.fetch();
        new UserView({el: mainDiv, collection: users});
    }
});

new app.session();
new app.router();
