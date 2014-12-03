var Backbone = require('backbone');
var Bootstrap = require('bootstrap');
var _ = require('lodash');

var eventbus = require('../eventbus');
var template = require('../template/Main');
var User = require('../model/User');

module.exports = Backbone.View.extend({

    template: template,

    events: {
        'click #login': 'login'
    },

    initialize: function() {
        this.render();
    },

    render: function() {
        var user = localStorage.getItem('user');
        this.$el.html(this.template(JSON.parse(user)));
        return this;
    },

    close: function() {
        this.stopListening();
    },

    login: function() {
        var username = this.$("#username").val();
        var password = this.$("#password").val();
        var user = new User();
        user.login({
            success: _.bind(function(response) {
                this.render();
            }, this),
            error: _.bind(function(response) {
                console.log(response);
                console.log("test");
            }, this)
        }, {nickname:username, password:password});
    }

});
