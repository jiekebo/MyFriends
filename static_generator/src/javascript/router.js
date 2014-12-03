var Backbone = require('backbone');

var MainView = require('./view/Main');
var UserView = require('./view/User');
var JoinView = require('./view/Join');

var Users = require('./collection/User');

module.exports = Backbone.Router.extend({
    users: new Users(),

    routes: {
        '': 'home',
        'home': 'home',
        'join': 'join',
        'user': 'user'
    },

    el: $("#main"),

    initialize: function() {
        Backbone.history.start();
    },

    showView: function(view) {
        var closingView = this.view;
        this.view = view;
        this.closeView(closingView);
    },

    closeView: function(view) {
        if (view) {
            view.close();
        }
    },

    home: function() {
        this.showView(new MainView({el: this.el, collection: this.users}));
    },

    join: function() {
        this.showView(new JoinView({el: this.el, collection: this.users, router: this}));
    },

    user: function() {
        this.users.fetch();
        this.showView(new UserView({el: this.el, collection: this.users}));
    }
});
