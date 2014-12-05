var Backbone = require('backbone');
var parsley = require('parsleyjs');
var _ = require('lodash');

var template = require('../template/Join');
var User = require('../model/User');

module.exports = Backbone.View.extend({

    template: template,

    events: {
        'submit': 'join'
    },

    initialize: function (option) {
        this.router = option.router;
        this.model = new User();

        this.listenTo(this.model, 'change', this.render);

        this.render();
    },

    render: function () {
        this.$el.html(this.template(this.model.toJSON()));
        this.form = this.$('#signup').parsley();
        return this;
    },

    close: function () {
        this.stopListening();
        this.undelegateEvents();
    },

    join: function (e) {
        e.preventDefault();
        if (!this.form.validate()) {
            return;
        }
        var nickname = this.$('#nickname').val();
        var email = this.$('#email').val();
        var password = this.$('#password').val();

        this.model.save({'nickname': nickname, 'email': email, 'password': password}, {
            success: _.bind(function (model, resp) {
                this.router.navigate('home', {trigger: true, replace: true});
            }, this),
            error: _.bind(function (model, resp) {
                this.$('#nickname-error').removeClass('hidden');
            }, this)
        });
    }

});
