var Backbone = require('backbone');
var $ = require('jquery');
Backbone.$ = $;
var Configurator = require('./view/User');

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
        new Configurator({el: mainDiv});
    }
});

new app.session();
new app.router();
