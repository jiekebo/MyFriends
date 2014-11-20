var Backbone = require('backbone');
var template = require('../template/Join');
var User = require('../model/User');

module.exports = Backbone.View.extend({

    template: template,

    events: {
        'click #join' : 'join'
    },

    initialize: function () {
        this.render();
    },

    render: function () {
        this.$el.html(this.template(this.collection.toJSON()));
        return this;
    },

    join: function () {
        var nickname = this.$('#nickname').val();
        var email = this.$('#email').val();
        var password = this.$('#password').val();
        var user = new User();
        user.set({'nickname':nickname, 'email':email, 'password':password});
        user.save();
    },

    close: function () {
        this.stopListening();
    }

});
