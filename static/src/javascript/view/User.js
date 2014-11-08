var Backbone = require('backbone');
var eventbus = require('../eventbus');
var template = require('../template/User');

module.exports = Backbone.View.extend({

    template: template,

    events: {
        "click #choice": 'getData'
    },

    initialize: function () {
        this.listenTo(eventbus, "configurator:productLoaded", this.render);
    },

    getData: function (event) {
        eventbus.trigger("availableChoices:choicePerformed", event.target.getAttribute('data'));
    },

    render: function (product) {
        var choices = {};
        this.$el.html(this.template(product.get('choices')));
        return this;
    },

    close: function () {
        this.stopListening();
    }

});
