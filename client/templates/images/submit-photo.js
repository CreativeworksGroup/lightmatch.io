//var userGeoLocation = new ReactiveVar(null);
var map = {};

initMap = function(){
    var lat = $("#myMap").data('lat');
    var lng = $("#myMap").data('lng');
        
    if (lat == undefined){
        lat = 0;
    }
    
    if (lng == undefined){
        lng = 0;
    }
    
    map = new Microsoft.Maps.Map(document.getElementById('myMap'), {
        credentials: 'Ar43VQmt00cBTA9slFkS3ePobQ0XzdiZmE-EPqP8SvrOzEHeAnjDtsfJEF3AKB3f',
        center: new Microsoft.Maps.Location(lat, lng),
        zoom: 10
    });

    var pushpin = new Microsoft.Maps.Pushpin(map.getCenter(), null);
    map.entities.push(pushpin);
    
    Microsoft.Maps.loadModule('Microsoft.Maps.Search', function () {
        var searchManager = new Microsoft.Maps.Search.SearchManager(map);
        var reverseGeocodeRequestOptions = {
            location: new Microsoft.Maps.Location($("#myMap").data('lat'), $("#myMap").data('lng')),
            callback: function (answer, userData) {
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
        map.setView({center:suggestionResult.location});
        var pushpin = new Microsoft.Maps.Pushpin(suggestionResult.location);
        map.entities.push(pushpin);
    }
}

Template.submitPhoto.events({
    'click #save-detail': function (e) {
        e.preventDefault();
        const target = e.target;
        //const text = target.text.value;

        var tags = $("#photo-tags").materialtags('items');
        var path = FlowRouter.current().path.split("/");
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
            FlowRouter.go('/photo/submit/success');
        });
    },
    'submit form': function(e){
        e.preventDefault();
    }
});

Template.submitPhoto.helpers({
    image: function () {
        let image = Images.findOne({_id: FlowRouter.getParam('_id')});
        if (image) {
            return image;
        }
    },
    mapOptions: function(){
//        if (Microsoft.Maps){
            // Map initialization options
            var lat = 0;
            var lng = 0;

            if (this.location != undefined){
                lat = this.location.lat;
                lng = this.location.lng;
            }
            
            if (lat == 0) {
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

Template.submitPhoto.onCreated(function(){
//    Tracker.autorun(function (computation) {
//      userGeoLocation.set(Geolocation.latLng());
//      if (userGeoLocation.get()) {
//        //stop the tracker if we got something
//            computation.stop();
//            initMap();
//      }
//    });    
});

Template.submitPhotoForm.onRendered(function () {
    // We can use the `ready` callback to interact with the map API once the map is ready.

//    $.getScript("https://www.bing.com/api/maps/mapcontrol?callback=initMap").done(function(script,status){
//
//    });

    var script = document.createElement('script');
    script.type = 'text/javascript';
//    script.src = 'https://maps.googleapis.com/maps/api/js?' + params +
//      '&callback=GoogleMaps.initialize';
    script.src = 'https://www.bing.com/api/maps/mapcontrol?callback=initMap';


    document.body.appendChild(script);

    this.$('input[data-role=materialtags]').materialtags({
        tagClass: 'chip'
    });

//    console.log($("#myMap").data('lat'));
});