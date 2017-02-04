Template.header.onRendered(function(){
    $(".button-collapse").sideNav();
    $('.dropdown-button').dropdown();
});
Template.header.helpers({
    'photoPath': function(){
        if (Meteor.user()){
            user = Meteor.user();
            return '/'+user.username;
        }
        else{
            return '/';
        }
    }
});

Template.header.events({
    'click a.lang': function(e){
        e.preventDefault();
        var lang = $(e.target).data("lang");
        TAPi18n.setLanguage(lang);
        $("html").attr("lang", lang);
    }
});