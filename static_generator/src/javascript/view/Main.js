var Backbone = require('backbone');
var Bootstrap = require('bootstrap');
var _ = require('lodash');

var eventbus = require('../eventbus');
var template = require('../template/Main');
var User = require('../model/User');

module.exports = Backbone.View.extend({

    template: template,

    events: {
        'click #login': 'login',
        'click #logout': 'logout'
    },

    initialize: function () {
        var userStore = localStorage.getItem('user');
        if (userStore) {
            this.user = new User(JSON.parse(userStore));
        }
        this.render();
    },

    render: function () {
        if (this.user) {
            this.$el.html(this.template(this.user.toJSON()));
        } else {
            this.$el.html(this.template());
        }
        return this;
    },

    close: function () {
        this.stopListening();
        this.undelegateEvents();
    },

    login: function () {
        var username = this.$("#username").val();
        var password = this.$("#password").val();
        this.user = new User();
        this.user.login({
            success: _.bind(function () {
                this.render();
            }, this),
            error: _.bind(function () {
                console.log("test");
            }, this)
        }, {nickname: username, password: password});
    },

    logout: function () {
        this.user.logout();
        this.render();
    }

});
