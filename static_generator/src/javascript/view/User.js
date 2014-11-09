var Backbone = require('backbone');
var eventbus = require('../eventbus');
var template = require('../template/User');
var Users = require('../collection/User');

module.exports = Backbone.View.extend({

    template: template,

    events: {},

    initialize: function () {
        this.listenTo(this.collection, 'change', this.render);
        this.listenTo(this.collection, 'add', this.render);
        this.listenTo(this.collection, 'remove', this.render);
        this.render();
    },

    render: function () {
        this.$el.html(this.template(this.collection.toJSON()));
        console.log(this.collection.toJSON());
        return this;
    },

    close: function () {
        this.stopListening();
    }

});
