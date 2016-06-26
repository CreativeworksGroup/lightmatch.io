Template.home.created = function(){
    var self = this;
    
    self.limit = new ReactiveVar;
    self.limit.set(parseInt(Meteor.settings.public.recordsPerPage));
    
    Tracker.autorun(function(){
        Meteor.subscribe('images', self.limit.get(), Router.current().params.userSlug);
    });
    
    Session.set('displayGrid', false);
}

Template.home.rendered = function(){
    var self = this;
    
    $(window).scroll(function(){
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100){
            incrementLimit(self);
        }
    });
    
}

Template.home.helpers({
    'images': function(){
        return Images.find({}, {sort:{uploadedAt:-1}});
    }
});

var incrementLimit = function(templateInstance){
    var newLimit = templateInstance.limit.get() + parseInt(Meteor.settings.public.recordsPerPage);
    templateInstance.limit.set(newLimit);
}

var $gallery;

//var initMasonry = function($imgs){
//    if ($gallery){
//        $gallery.masonry({
//            itemSelector : '.image.col-md-3',
//            gutter: 10,
//            columnWidth: '.col-md-3'
//        });
//    }
//};

var debouncedRelayout = _.debounce(function(){
    if ($gallery){
        $gallery.masonry();
        console.log('debounced called.')
    }
},500);

Template.home.onRendered(function(){
    $gallery = $(".images");
        
    $("#view-switcher a.full").click(function(e){
        e.preventDefault();
//        console.log("full clicked");
        $(".image").removeClass('col-md-3');
        $gallery.masonry('destroy'); 
        Session.set('displayGrid', false);
    });

    $("#view-switcher a.grid").click(function(e){
        e.preventDefault();
//        console.log("grid clicked");
        $(".image").addClass('col-md-3');
        Session.set('displayGrid', true);
        
        var $imgs = $('.thumb');
        $gallery.imagesLoaded(function() {
            $(".images").masonry({
                itemSelector : '.image.col-md-3',
                gutter: 20,
                columnWidth: 15,
                percentPosition: true
            });
        });
    });

});

Template.image.onRendered(function() {
  var $imgs = $('.image.col-md-3');
  if ($gallery && $imgs) {
    $imgs.imagesLoaded(function() {
//        console.log($imgs);
        var displayGrid = Session.get('displayGrid');
        if (displayGrid){
//            $imgs.imagesLoaded(function() {
//                console.log($imgs[0]);
                $gallery.masonry('destroy');
                $gallery.masonry();
//                $gallery.masonry('appended', $($imgs));
//                $gallery.masonry('addItems', $($imgs);
//                $gallery.masonry('reloadItems');
//                debouncedRelayout();
//            });
        }
    });
  }
});