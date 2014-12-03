var Backbone = require('backbone');
var Bootstrap = require('bootstrap');
var eventbus = require('../eventbus');
var template = require('../template/Main');
var User = require('../model/User');

module.exports = Backbone.View.extend({

    template: template,

    events: {
        'click #login': 'login'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(this.template(this.collection.toJSON()));
        return this;
    },

    close: function () {
        this.stopListening();
    },

    login: function () {
        var username = this.$("#username").val();
        var password = this.$("#password").val();
        var user = new User();
        user.login({
            'success': function(response) {
                console.log(response);
            },
            'error': function(response) {
                console.log(response);
                console.log("test");
            }
        }, {nickname:username, password:password});
    }

});
