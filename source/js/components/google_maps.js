App.GoogleMapsComponent = Ember.Component.extend({
    insertMap: function () {
        var container = this.$(".map-canvas");

        var options = {
                center: new google.maps.LatLng(this.get("latitude"), this.get("longitude")),
                zoom: 14,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };

        new google.maps.Map(container[0], options);
    }.on('didInsertElement')
});
