var $gallery = $(".images");

Template.home.created = function(){
    var self = this;
    
    self.limit = new ReactiveVar;
    self.limit.set(parseInt(Meteor.settings.public.recordsPerPage));
    
    Tracker.autorun(function(){
        Meteor.subscribe('images', self.limit.get(), Router.current().params.userSlug, {onReady:function(){
            var displayGrid = Session.get('displayGrid');
            if (displayGrid){
                debouncedRelayout();
            }
        }});
        
//        Meteor.subscribe('profilePictures');
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
        $gallery.masonry({
                itemSelector: '.col.m6',
                columnWidth: '.col.m6',
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