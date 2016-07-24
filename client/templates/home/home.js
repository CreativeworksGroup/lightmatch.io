var $gallery = $(".images");

Template.home.created = function(){
    var self = this;
    
    self.limit = new ReactiveVar;
    self.limit.set(parseInt(Meteor.settings.public.recordsPerPage));
    
    Tracker.autorun(function(){
        Meteor.subscribe('images', self.limit.get(), Router.current().params.userSlug, {onReady:function(){
//            console.log("new data ready");
            var displayGrid = Session.get('displayGrid');
            console.log(displayGrid);
            if (displayGrid){
                debouncedRelayout();
//                _.debounce(function(){
////                    console.log('call masonry reload');
//                    $(".images").masonry('reloadItems');
//                }, 500);
            }
        }});
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

var debouncedRelayout = _.debounce(function(){
    if ($(".images")){
        console.log('relayout');
        $(".images").masonry('reloadItems');
        $(".images").masonry();
    }
},600);

Template.home.onRendered(function(){
    $gallery = $(".images");
        
    $("#view-switcher a.full").click(function(e){
        e.preventDefault();
        $(".image").removeClass('m6 l4');
        $(".images").masonry('destroy'); 
        Session.set('displayGrid', false);
    });

    $("#view-switcher a.grid").click(function(e){
        e.preventDefault();
        $(".image").addClass('m6 l4');
        Session.set('displayGrid', true);
        
//        var $imgs = $('.thumb');
//        $gallery.imagesLoaded(function() {
//            $(".images").masonry({
//                itemSelector : '.image.col-md-3',
//                gutter: 20,
//                columnWidth: 15,
//                percentPosition: true
//            });
//        });
        $gallery.masonry({
                itemSelector: '.col.m6',
                columnWidth: '.col.m6',
//                gutter: 2,
                percentPosition: true
            });        
        debouncedRelayout();
    });

});

Template.image.onRendered(function(){
    $(".images").imagesLoaded(function(){
        debouncedRelayout();
    });
});

//Template.image.onRendered(function() {
//  var $imgs = $('.image.col-md-3');
//  if ($gallery && $imgs) {
//    $imgs.imagesLoaded(function() {
////        console.log($imgs);
//        var displayGrid = Session.get('displayGrid');
//        if (displayGrid){
////            $imgs.imagesLoaded(function() {
////                console.log($imgs[0]);
//                $gallery.masonry('destroy');
//                $gallery.masonry();
////                $gallery.masonry('appended', $($imgs));
////                $gallery.masonry('addItems', $($imgs);
////                $gallery.masonry('reloadItems');
////                debouncedRelayout();
////            });
//        }
//    });
//  }
//});