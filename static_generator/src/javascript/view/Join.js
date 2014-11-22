var Backbone = require('backbone');
var parsley = require('parsleyjs');
var template = require('../template/Join');
var User = require('../model/User');

module.exports = Backbone.View.extend({

    template: template,

    events: {
        'click #join' : 'join'
    },

    initialize: function () {
        this.render();
        this.form = this.$('#signup').parsley();
    },

    render: function () {
        this.$el.html(this.template(this.collection.toJSON()));
        return this;
    },

    join: function () {
        if(!this.form.validate()) {
            return;
        }
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
