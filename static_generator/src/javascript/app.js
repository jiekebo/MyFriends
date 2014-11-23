var Backbone = require('backbone');
Backbone.$ = jQuery;

var Router = require('./router');

var app = {};

app.session = Backbone.Model.extend({
    // Initialize with negative/empty defaults
    // These will be overriden after the initial checkAuth
    defaults: {
        logged_in: false,
        user_id: ''
    },

    initialize: function () {
        $.ajaxPrefilter(function (options, originalOptions, jqXHR) {
            options.crossDomain = {
                crossDomain: true
            };
        });
    }
});

app.router = new Router();
