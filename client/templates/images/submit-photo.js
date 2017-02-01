var map = {};

initMap = function(){
    var lat = $("#myMap").data('lat');
    var lng = $("#myMap").data('lng');
    
    if (!lat){
        lat = 0;
    }
    
    if (!lng){
        lng = 0;
    }
    
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: 'Ar43VQmt00cBTA9slFkS3ePobQ0XzdiZmE-EPqP8SvrOzEHeAnjDtsfJEF3AKB3f',
        center: new Microsoft.Maps.Location(lat, lng),
//        mapTypeId: Microsoft.Maps.MapTypeId.aerial,
        zoom: 10
    });

    var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), null);
//    var layer = new Microsoft.Maps.Layer();
//    layer.add(pushpin);
//    map.layers.insert(layer);
    map.entities.push(pushpin);
    
    Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
        var searchManager = new Microsoft.Maps.Search.SearchManager(map);
        var reverseGeocodeRequestOptions = {
            location: new Microsoft.Maps.Location($("#myMap").data('lat'), $("#myMap").data('lng')),
            callback: function (answer, userData) {
//                map.setView({ bounds: answer.bestView });
//                map.entities.push(new Microsoft.Maps.Pushpin(reverseGeocodeRequestOptions.location));
                $("#search-box").val(answer.address.formattedAddress);
            }
        };
        searchManager.reverseGeocode(reverseGeocodeRequestOptions);
    });
    
    Microsoft.Maps.loadModule('Microsoft.Maps.AutoSuggest', function () {
        var options = {
            maxResults: 4,
            map: map
        };
        var manager = new Microsoft.Maps.AutosuggestManager(options);
        manager.attachAutosuggest('#search-box', '#search-box-container', selectedSuggestion);
    });
    function selectedSuggestion(suggestionResult) {
        map.entities.clear();
//        map.setView({ bounds: suggestionResult.bestView });
        map.setView({center:suggestionResult.location});
        var pushpin = new Microsoft.Maps.Pushpin(suggestionResult.location);
        map.entities.push(pushpin);
//        document.getElementById('printoutPanel').innerHTML =
//            'Suggestion: ' + suggestionResult.formattedSuggestion +
//                '<br> Lat: ' + suggestionResult.location.latitude +
//                '<br> Lon: ' + suggestionResult.location.longitude;
    }    
}

Template.submitPhoto.rendered = function () {
    this.$('input[data-role=materialtags]').materialtags({
        tagClass: 'chip'
    });
}

Template.submitPhoto.onRendered = function () {
//    GoogleMaps.load({
//        v: '3',
//        key: 'AIzaSyClrGtDMTFbuU4PahJzgM7N-wDv6PYsI60',
//        libraries: 'geometry,places'
//    });
     
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
                    $each: tags.map(function(x){return x.toLowerCase();})
                }
            },
            $set: {
                description: $("#description").val(),
                location:{
//                    lat: GoogleMaps.maps.photoLocation.instance.center.lat(),
//                    lng: GoogleMaps.maps.photoLocation.instance.center.lng()
                    lat: map.getCenter().latitude,
                    lng: map.getCenter().longitude
                },
//                place: $("#google-place").val(),
                place: $("#search-box").val(),
                submitted: true
            }
        }, null, function(){
            Router.go('/photo/submit/success');
        });
    },
    'submit form': function(e){
        e.preventDefault();
    }
});

Template.submitPhoto.helpers({
//    mapOptions: function () {
//        // Make sure the maps API has loaded
//        if (GoogleMaps.loaded()) {
//            // Map initialization options
//            var lat = '';
//            var lng = '';
//
//            if (this.location != undefined){
//                lat = this.location.lat;
//                lng = this.location.lng;
//            }
//            
//            if (lat == '') {
//                var latLng = Geolocation.latLng();
//                lat = latLng.lat;
//                lng = latLng.lng;                    
//            }
//            return {
//                center: new google.maps.LatLng(lat, lng),
//                zoom: 13
//            };
//        }
//    }
    
    mapOptions: function(){
//        if (Microsoft.Maps){
            // Map initialization options
            var lat = '';
            var lng = '';

            if (this.location != undefined){
                lat = this.location.lat;
                lng = this.location.lng;
            }
            
            if (lat == '') {
                var latLng = Geolocation.latLng();
                lat = latLng.lat;
                lng = latLng.lng;                    
            }
            return {
//                center: new google.maps.LatLng(lat, lng),
                lat,
                lng
            };            
//        }
    }
});

Template.submitPhoto.onCreated(function () {
    // We can use the `ready` callback to interact with the map API once the map is ready.
//    GoogleMaps.ready('photoLocation', function (map) {
//        // Add a marker to the map once it's ready
//        var marker = new google.maps.Marker({
//            position: map.options.center,
//            map: map.instance
//        });
//
//        var geocoder = new google.maps.Geocoder;
//        var infowindow = new google.maps.InfoWindow;
//        geocoder.geocode({'location': map.options.center}, function(results, status) {
//          if (status === 'OK') {
//            if (results[1]) {
//              map.instance.setZoom(11);
//                $("#google-place").val(results[1].formatted_address);
//                Materialize.updateTextFields();
//                infowindow.setContent(results[1].formatted_address);
//                infowindow.open(map.instance, marker);
//
//            } else {
//              window.alert('No results found');
//            }
//          } else {
//            window.alert('Geocoder failed due to: ' + status);
//          }
//        });
//        map.instance.addListener('bounds_changed', function () {
//            searchBox.setBounds(map.instance.getBounds());
//        });
//
//        var input = document.getElementById('google-place');
//        var searchBox = new google.maps.places.SearchBox(input);
//        searchBox.addListener('places_changed', function () {
//            var places = searchBox.getPlaces();
//
//            if (places.length == 0) {
//                return;
//            }
//
//            var bounds = new google.maps.LatLngBounds();
//            places.forEach(function (place) {
//                if (!place.geometry) {
//                    console.log("Returned place contains no geometry");
//                    return;
//                }
//                marker.setMap(null);
//                marker = new google.maps.Marker({
//                    map: map.instance,
//                    title: place.name,
//                    position: place.geometry.location
//                });
//
//                if (place.geometry.viewport) {
//                    // Only geocodes have viewport.
//                    bounds.union(place.geometry.viewport);
//                } else {
//                    bounds.extend(place.geometry.location);
//                }
//            });
//            
//            map.instance.fitBounds(bounds);
//        });
//    });
//    $.getScript("https://www.bing.com/api/maps/mapcontrol?callback=initMap").done(function(script,status){
//        
//    });   

    var script = document.createElement('script');
    script.type = 'text/javascript';
//    script.src = 'https://maps.googleapis.com/maps/api/js?' + params +
//      '&callback=GoogleMaps.initialize';
    script.src = 'https://www.bing.com/api/maps/mapcontrol?callback=initMap';
  

    document.body.appendChild(script);    
});