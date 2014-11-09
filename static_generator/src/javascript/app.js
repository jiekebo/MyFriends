var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;

var UserView = require('./view/User');
var JoinView = require('./view/Join');

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
    users: new Users(),

    initialize: function () {
        Backbone.history.start();

    },

    routes: {
        '': 'home',
        'home': 'home',
        'user': 'user'
    },

    home: function () {
        var mainDiv = $('#main');
        new JoinView({el: mainDiv, collection: this.users});
    },

    user: function () {
        var mainDiv = $('#main');
        this.users.fetch();
        new UserView({el: mainDiv, collection: this.users});
    }
});

new app.session();
new app.router();
