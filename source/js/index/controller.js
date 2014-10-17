App.IndexRoute = Ember.Route.extend({
    setupController: function(controller) {
        controller.set('title', "Ember App");
    }
});