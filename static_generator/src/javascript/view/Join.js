var Backbone = require('backbone');
var template = require('../template/Join');
var Users = require('../collection/User');

module.exports = Backbone.View.extend({

    template: template,

    events: {
        "click #join": 'join'
    },

    initialize: function () {
        this.listenTo(this.collection, 'change', this.render);
        this.listenTo(this.collection, 'add', this.render);
        this.listenTo(this.collection, 'remove', this.render);
        this.render();
    },

    render: function () {
        this.$el.html(this.template(this.collection.toJSON()));
        return this;
    },

    join: function () {
        console.log("blabla");
    },

    close: function () {
        this.stopListening();
    }

});
