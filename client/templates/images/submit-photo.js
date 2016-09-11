Template.submitPhoto.rendered = function () {
    this.$('input[data-role=materialtags]').materialtags({
        tagClass: 'chip'
    });
}

Template.submitPhoto.onRendered = function () {
    GoogleMaps.load({
        v: '3',
        key: 'AIzaSyClrGtDMTFbuU4PahJzgM7N-wDv6PYsI60',
        libraries: 'geometry,places'
    });
}

Template.submitPhoto.events({
    'click #save-detail': function (e) {
        e.preventDefault();
        const target = e.target;
        //const text = target.text.value;

        var tags = $("#photo-tags").materialtags('items');
        var path = Iron.Location.get().path.split("/");
        var imgId = path[2];

        Images.update(imgId, {
            $addToSet: {
                tags: {
                    $each: tags
                }
            },
            $set: {
                description: $("#description").val(),
                location:{
                    lat: GoogleMaps.maps.photoLocation.instance.center.lat(),
                    lng: GoogleMaps.maps.photoLocation.instance.center.lng()
                },
                submitted: true
            }
        }, null, function(){
            console.log("image updated.");
            Router.go('/photo/submit/success');
        });
    }
});

Template.submitPhoto.helpers({
    mapOptions: function () {
        // Make sure the maps API has loaded
        if (GoogleMaps.loaded()) {
            // Map initialization options
            var lat = this.location.lat;
            var lng = this.location.lng;

            if (lat == '') {
                var latLng = Geolocation.latLng();
                lat = latLng.lat;
                lng = latLng.lng;
            }
            return {
                center: new google.maps.LatLng(lat, lng),
                zoom: 13
            };
        }
    }
});

Template.submitPhoto.onCreated(function () {
    // We can use the `ready` callback to interact with the map API once the map is ready.
    GoogleMaps.ready('photoLocation', function (map) {
        // Add a marker to the map once it's ready
        var marker = new google.maps.Marker({
            position: map.options.center,
            map: map.instance
        });

        map.instance.addListener('bounds_changed', function () {
            searchBox.setBounds(map.instance.getBounds());
        });

        var input = document.getElementById('google-place');
        var searchBox = new google.maps.places.SearchBox(input);
        //      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
        searchBox.addListener('places_changed', function () {
            var places = searchBox.getPlaces();

            if (places.length == 0) {
                return;
            }

            var bounds = new google.maps.LatLngBounds();
            places.forEach(function (place) {
                if (!place.geometry) {
                    console.log("Returned place contains no geometry");
                    return;
                }
                marker = new google.maps.Marker({
                    map: map.instance,
                    title: place.name,
                    position: place.geometry.location
                });

                if (place.geometry.viewport) {
                    // Only geocodes have viewport.
                    bounds.union(place.geometry.viewport);
                } else {
                    bounds.extend(place.geometry.location);
                }
            });
            
            map.instance.fitBounds(bounds);
        });
    });
});