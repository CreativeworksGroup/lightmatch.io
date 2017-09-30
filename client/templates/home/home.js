import imagesLoaded from 'imagesloaded';

let gallery, images, msnry;

Template.registerHelper('_', function () {
    return _;
}); 

Template.home.onCreated(function () {
    const self = this;

    self.limit = new ReactiveVar;
    self.limit.set(parseInt(Meteor.settings.public.recordsPerPage));

    this.autorun(function() {
        self.subscribe('images', self.limit.get(), Router.current().params.userSlug, Router.current().params.searchQuery, {onReady: function() {
            if (Session.equals('displayGrid', 'true')) {
                debouncedRelayout();
            }
        }});

//        Meteor.subscribe('profilePictures');
    });

    if (localStorage.getItem('displayGrid') === undefined) {
        // localStorage accepts String value only
        localStorage.setItem('displayGrid', 'false');
    }
    // Make localStorage reactive
    Session.set('displayGrid', localStorage.getItem('displayGrid'));
});

Template.home.onRendered(function () {
    const self = this;
    gallery = document.querySelector('.images');
    images = document.getElementsByClassName('image');
    let isAppStart = true;
    let isMasonryInited = false;

    $(window).on('scroll', _.throttle(function() {
        if ($(window).scrollTop() + $(window).height() > $(document).height() - 100) {
            incrementLimit(self);
        }
    }, 200));

    this.autorun(function () {
        if (self.subscriptionsReady()) {
            if (Session.equals('displayGrid', 'true')) {
                if (!isAppStart) {
                    for (const image of images) {
                        image.classList.add('m6', 'l4');
                    }
                }
                if (!isMasonryInited) {
                    initMasonry();
                    isMasonryInited = true;
                }
            } else {
                if (isMasonryInited) {
                    for (const image of images) {
                        image.classList.remove('m6', 'l4');
                    }
                    msnry.destroy();
                    isMasonryInited = false;
                }
            }

            if (isAppStart) {
                isAppStart = false;
            }
        }
    });

    $("#view-switcher a.full").click(function(e) {
        e.preventDefault();
        if (!Session.equals('displayGrid', 'false')) {
            // localStorage accepts String value only
            localStorage.setItem('displayGrid', 'false');
            // Make localStorage reactive
            Session.set('displayGrid', localStorage.getItem('displayGrid'));
        }
    });

    $("#view-switcher a.grid").click(function(e) {
        e.preventDefault();
        if (!Session.equals('displayGrid', 'true')) {
            // localStorage accepts String value only
            localStorage.setItem('displayGrid', 'true');
            // Make localStorage reactive
            Session.set('displayGrid', localStorage.getItem('displayGrid'));
        }
    });
});

Template.home.helpers({
    'images': function() {
        return Images.find({}, {sort:{uploadedAt:-1}});
    }
});

Template.home.events({
   'submit form#search-form': function(e) {
       e.preventDefault();
       
       Router.go('/tag/'+$("input#search").val());
   }
});
       
       
var incrementLimit = function(templateInstance) {
    var newLimit = templateInstance.limit.get() + parseInt(Meteor.settings.public.recordsPerPage);
    templateInstance.limit.set(newLimit);
}

let debouncedRelayout = _.debounce(function() {
    if (gallery) {
        imagesLoaded(gallery, function() {
            msnry.reloadItems();
            msnry.layout();
        });
    }
}, 600);

let initMasonry = () => {
    msnry = new Masonry(gallery, {
        itemSelector: '.col.m6',
        columnWidth: '.col.m6',
        percentPosition: true,
    });
}