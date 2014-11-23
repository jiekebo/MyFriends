var Backbone = require('backbone');

var UserView = require('./view/User');
var JoinView = require('./view/Join');

var Users = require('./collection/User');

module.exports = Backbone.Router.extend({
    users: new Users(),

    routes: {
        '': 'home',
        'home': 'home',
        'user': 'user'
    },

    el: $("#main"),

    initialize: function () {
        Backbone.history.start();
    },

    showView: function (view) {
        var closingView = this.view;
        this.view = view;
        this.closeView(closingView);
    },

    closeView: function (view) {
        if (view) {
            view.close();
        }
    },

    home: function () {
        this.showView(new JoinView({el: this.el, collection: this.users}));
    },

    user: function () {
        this.users.fetch();
        this.showView(new UserView({el: this.el, collection: this.users}));
    }
});