Template.submitPhoto.rendered = function(){
    this.$('input[data-role=materialtags]').materialtags({
        tagClass: 'chip'
    });
    

}

Template.submitPhoto.onRendered = function(){
    GoogleMaps.load({v:'3', key: 'AIzaSyClrGtDMTFbuU4PahJzgM7N-wDv6PYsI60', libraries: 'geometry,places'});   
}

Template.submitPhoto.events({
    'click #save-tags':function(e){
        e.preventDefault();
        const target = e.target;
        //const text = target.text.value;
        
        var tags = $("#photo-tags").materialtags('items');
        var path = Iron.Location.get().path.split("/");
        var imgId = path[2];
        
        Images.update(imgId, {$addToSet: {tags: {$each:tags}}});
    }
});

Template.body.helpers({
  exampleMapOptions: function() {
    // Make sure the maps API has loaded
    if (GoogleMaps.loaded()) {
      // Map initialization options
      return {
        center: new google.maps.LatLng(-37.8136, 144.9631),
        zoom: 8
      };
    }
  }
});

Template.body.onCreated(function() {
  // We can use the `ready` callback to interact with the map API once the map is ready.
  GoogleMaps.ready('exampleMap', function(map) {
    // Add a marker to the map once it's ready
    var marker = new google.maps.Marker({
      position: map.options.center,
      map: map.instance
    });
  });
});